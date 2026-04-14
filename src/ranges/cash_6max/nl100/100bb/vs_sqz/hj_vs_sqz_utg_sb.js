// HJ vs sqz UTG+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz UTG+SB",
  description: "HJ called UTG, faces SB squeeze — 6-max, 100bb",
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
        '100bb': "[1.98922535]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.98922535], [3.97254054]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/3.97254054]"
      },
      call: {
        '15bb': "[1.09668239]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/1.09668239], [2.8562069]7h6h, 7d6d, 7s6s, 7c6c[/2.8562069], [3.6647407299999997]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/3.6647407299999997], [4.34275743]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/4.34275743], [7.27678494]6h5h, 6d5d, 6s5s, 6c5c[/7.27678494], [7.79514684]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/7.79514684], [7.844448669999999]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/7.844448669999999], [9.87449578]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/9.87449578], [15.25763254]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/15.25763254]"},
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
