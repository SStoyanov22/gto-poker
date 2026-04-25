#!/usr/bin/env python3
"""Round-trip codec for PT4 .pt4hud files.

Tree representation:
  ('str', text)
  ('i', value, width)        # variable-width int, preserve original width
  ('l', value)               # 32-bit (often ARGB)
  ('b', bool)
  ('f', float)
  ('d', float)
  ('null', None)
  ('unit', None)
  ('e', None)
  ('Z', None)
  ('seq', [children])        # < ... >
"""
import struct, sys
from pathlib import Path


def parse(data, pos):
    """Parse one value at pos. Returns (node, new_pos)."""
    tag = data[pos]; pos += 1
    c = chr(tag) if 32 <= tag < 127 else None
    if c == 's':
        n = struct.unpack('>I', data[pos:pos+4])[0]; pos += 4
        s = data[pos:pos+n*2].decode('utf-16-be')
        pos += n*2
        return ('str', s), pos
    if c == 'i':
        w = data[pos]; pos += 1
        v = int.from_bytes(data[pos:pos+w], 'big', signed=True); pos += w
        return ('i', v, w), pos
    if c == 'l':
        v = struct.unpack('>I', data[pos:pos+4])[0]; pos += 4
        return ('l', v), pos
    if c == 'b':
        v = data[pos]; pos += 1
        return ('b', bool(v)), pos
    if c == 'f':
        v = struct.unpack('>f', data[pos:pos+4])[0]; pos += 4
        return ('f', v), pos
    if c == 'd':
        v = struct.unpack('>d', data[pos:pos+8])[0]; pos += 8
        return ('d', v), pos
    if c == 'n':
        return ('null', None), pos
    if c == 'u':
        return ('unit', None), pos
    if c == 'e':
        return ('e', None), pos
    if c == 'Z':
        return ('Z', None), pos
    if c == '<':
        children = []
        while data[pos] != ord('>'):
            child, pos = parse(data, pos)
            children.append(child)
        pos += 1  # consume >
        return ('seq', children), pos
    raise ValueError(f'Unknown tag {tag:#x} at offset {pos-1:#x}')


def parse_file(path):
    data = Path(path).read_bytes()
    n = struct.unpack('>I', data[:4])[0]
    header = data[4:4+n*2].decode('utf-16-be')
    pos = 4 + n*2
    version = data[pos:pos+4]
    pos += 4

    children = []
    while pos < len(data):
        node, pos = parse(data, pos)
        children.append(node)
    return {
        'header': header,
        'version': version,
        'root': children,
        'raw': data,
    }


def encode_value(node, out):
    kind = node[0]
    if kind == 'str':
        s = node[1]
        b = s.encode('utf-16-be')
        out.append(b's')
        out.append(struct.pack('>I', len(s)))
        out.append(b)
    elif kind == 'i':
        v, w = node[1], node[2]
        out.append(b'i')
        out.append(bytes([w]))
        out.append(int(v).to_bytes(w, 'big', signed=True))
    elif kind == 'l':
        out.append(b'l')
        out.append(struct.pack('>I', node[1] & 0xFFFFFFFF))
    elif kind == 'b':
        out.append(b'b')
        out.append(b'\x01' if node[1] else b'\x00')
    elif kind == 'f':
        out.append(b'f')
        out.append(struct.pack('>f', node[1]))
    elif kind == 'd':
        out.append(b'd')
        out.append(struct.pack('>d', node[1]))
    elif kind == 'null':
        out.append(b'n')
    elif kind == 'unit':
        out.append(b'u')
    elif kind == 'e':
        out.append(b'e')
    elif kind == 'Z':
        out.append(b'Z')
    elif kind == 'seq':
        out.append(b'<')
        for c in node[1]:
            encode_value(c, out)
        out.append(b'>')
    else:
        raise ValueError(f'Unknown kind {kind}')


def encode_file(parsed):
    out = []
    header = parsed['header'].encode('utf-16-be')
    out.append(struct.pack('>I', len(parsed['header'])))
    out.append(header)
    out.append(parsed['version'])
    for c in parsed['root']:
        encode_value(c, out)
    return b''.join(out)


def main():
    src = sys.argv[1]
    p = parse_file(src)
    encoded = encode_file(p)
    if encoded == p['raw']:
        print(f'OK round-trip: {len(encoded)} bytes')
    else:
        print(f'MISMATCH: orig={len(p["raw"])}, encoded={len(encoded)}')
        # find first diff
        for i, (a, b) in enumerate(zip(p['raw'], encoded)):
            if a != b:
                print(f'  first diff @ {i:#x}: orig=0x{a:02x} new=0x{b:02x}')
                ctx = p['raw'][max(0,i-8):i+24].hex()
                print(f'  orig context: {ctx}')
                ctx2 = encoded[max(0,i-8):i+24].hex()
                print(f'  new  context: {ctx2}')
                break

if __name__ == '__main__':
    main()
