// HJ vs sqz UTG+CO (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz UTG+CO",
  description: "HJ called UTG, faces CO squeeze — 6-max, 100bb",
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
        '100bb': "[8.75760559]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/8.75760559], [12.880896589999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/12.880896589999999]"
      },
      call: {
        '11bb': "[0.58201751]8h7h, 8d7d, 8s7s, 8c7c[/0.58201751], [1.46680512]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.46680512], [1.8119738600000002]Ah4h, Ad4d, As4s, Ac4c[/1.8119738600000002], [2.17664708]Th9h, Td9d, Ts9s, Tc9c[/2.17664708], [3.8741017099999997]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/3.8741017099999997], [5.502937370000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/5.502937370000001], [5.98172349]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/5.98172349], [6.349507259999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/6.349507259999999], [8.09274413]7h6h, 7d6d, 7s6s, 7c6c[/8.09274413], [8.94446784]5h4h, 5d4d, 5s4s, 5c4c[/8.94446784], [9.08717903]6h5h, 6d5d, 6s5s, 6c5c[/9.08717903], [11.53425532]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/11.53425532], [15.214185529999998]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/15.214185529999998], [16.35139853]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/16.35139853], [29.57035222]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/29.57035222], [31.77481594]AhQh, AdQd, AsQs, AcQc[/31.77481594], [36.61484083]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/36.61484083]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
