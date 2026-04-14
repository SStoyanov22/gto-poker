// HJ vs sqz UTG+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz UTG+BB",
  description: "HJ called UTG, faces BB squeeze — 6-max, 100bb",
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
        '100bb': "[3.42831954]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/3.42831954], [5.23117676]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/5.23117676]"
      },
      call: {
        '15bb': "[1.06696954]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.06696954], [1.2300494400000002]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/1.2300494400000002], [3.7780606199999998]6h5h, 6d5d, 6s5s, 6c5c[/3.7780606199999998], [6.542753780000001]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/6.542753780000001], [7.62264985]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/7.62264985], [7.77229903]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/7.77229903], [10.05724908]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/10.05724908], [10.83162447]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/10.83162447], [10.8973226]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/10.8973226], [13.99932324]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/13.99932324]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
