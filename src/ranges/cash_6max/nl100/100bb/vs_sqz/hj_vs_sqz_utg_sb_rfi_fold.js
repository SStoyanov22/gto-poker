// HJ vs sqz UTG+SB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz UTG+SB (RFI fold)",
  description: "HJ cold called UTG, faces SB squeeze, UTG folded — 6-max, 100bb",
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
        '100bb': "[0.83564118]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/0.83564118], [6.09910175]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/6.09910175], [7.39064653]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/7.39064653]"
      },
      call: {
        '15bb': "[1.00187791]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/1.00187791], [1.15006722]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/1.15006722], [1.74497692]7h6h, 7d6d, 7s6s, 7c6c[/1.74497692], [1.78178808]8h7h, 8d7d, 8s7s, 8c7c[/1.78178808], [2.2687643399999997]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/2.2687643399999997], [2.85910985]Th9h, Td9d, Ts9s, Tc9c[/2.85910985], [2.9364761600000002]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.9364761600000002], [3.03268606]JhTh, JdTd, JsTs, JcTc[/3.03268606], [3.06277329]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/3.06277329], [3.8206525499999997]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/3.8206525499999997], [4.27091328]5h4h, 5d4d, 5s4s, 5c4c[/4.27091328], [5.47272091]6h5h, 6d5d, 6s5s, 6c5c[/5.47272091], [6.15037528]KhJh, KdJd, KsJs, KcJc[/6.15037528], [8.161498250000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/8.161498250000001], [11.83983424]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/11.83983424], [12.973810660000002]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/12.973810660000002], [24.21413423]AhQh, AdQd, AsQs, AcQc[/24.21413423]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
