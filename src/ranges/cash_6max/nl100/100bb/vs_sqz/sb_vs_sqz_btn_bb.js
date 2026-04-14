// SB vs sqz BTN+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs sqz BTN+BB",
  description: "SB called BTN, faces BB squeeze — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: "",
      call: "",
    },
    '2.25bb': {
      raise: "",
      call: "",
    },
    '2.5bb': {
      raise: {
        '100bb': "[3.2074017]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/3.2074017], [10.52525563]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/10.52525563], [10.61707956]KhJh, KdJd, KsJs, KcJc[/10.61707956], [13.035748759999999]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/13.035748759999999]"
      },
      call: {
        '12bb' : "[0.6558556]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/0.6558556], [0.70831641]KhTh, KdTd, KsTs, KcTc[/0.70831641], [1.51955949]JhTh, JdTd, JsTs, JcTc[/1.51955949], [1.79902012]QhJh, QdJd, QsJs, QcJc[/1.79902012], [2.5472727099999997]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/2.5472727099999997], [3.7695836000000003]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/3.7695836000000003], [4.15557584]AhJh, AdJd, AsJs, AcJc[/4.15557584], [5.91795758]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/5.91795758], [9.38032007]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/9.38032007], [10.11045562]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/10.11045562], [11.19805124]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/11.19805124], [13.47575724]KhJh, KdJd, KsJs, KcJc[/13.47575724], [18.368899550000002]AhTh, AdTd, AsTs, AcTc[/18.368899550000002]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
