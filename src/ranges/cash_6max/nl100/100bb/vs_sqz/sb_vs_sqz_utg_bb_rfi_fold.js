// SB vs sqz UTG+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs sqz UTG+BB (RFI fold)",
  description: "SB cold called UTG, faces BB squeeze, UTG folded — 6-max, 100bb",
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
        '100bb': "[0.50296206]AhQh, AdQd, AsQs, AcQc[/0.50296206], [11.862369509999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/11.862369509999999], [13.23118982]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/13.23118982], [24.88437785]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/24.88437785]"
      },
      call: {
        '12bb': "[0.5528401199999999]5h4h, 5d4d, 5s4s, 5c4c[/0.5528401199999999], [0.60235908]KhJh, KdJd, KsJs, KcJc[/0.60235908], [0.69414197]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/0.69414197], [1.25611147]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/1.25611147], [1.30996262]6h5h, 6d5d, 6s5s, 6c5c[/1.30996262], [1.33840647]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/1.33840647], [1.63303819]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.63303819], [1.90975968]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/1.90975968], [2.23347352]AhJh, AdJd, AsJs, AcJc[/2.23347352], [2.33142337]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.33142337], [3.41655492]KhQh, KdQd, KsQs, KcQc[/3.41655492], [4.54602883]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/4.54602883], [12.707083960000002]AhQh, AdQd, AsQs, AcQc[/12.707083960000002]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
