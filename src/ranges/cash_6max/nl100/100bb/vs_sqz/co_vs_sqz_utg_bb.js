// CO vs sqz UTG+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz UTG+BB",
  description: "CO called UTG, faces BB squeeze — 6-max, 100bb",
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
        '100bb': "[7.66578767]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/7.66578767], [12.55650043]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/12.55650043]"
      },
      call: {
        '15bb': "[2.93181937]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/2.93181937], [5.48925619]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/5.48925619], [5.86144862]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/5.86144862], [6.946598430000001]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/6.946598430000001], [7.99430007]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/7.99430007], [8.70873578]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/8.70873578], [9.34706385]AhQh, AdQd, AsQs, AcQc[/9.34706385], [9.58532257]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/9.58532257], [9.87335762]6h5h, 6d5d, 6s5s, 6c5c[/9.87335762], [11.62575905]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/11.62575905]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
