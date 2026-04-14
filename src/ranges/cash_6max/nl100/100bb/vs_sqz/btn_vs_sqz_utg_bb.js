// BTN vs sqz UTG+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz UTG+BB",
  description: "BTN called UTG, faces BB squeeze — 6-max, 100bb",
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
        '100bb': "[3.3446225099999998]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/3.3446225099999998], [6.716457200000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/6.716457200000001], [6.9758401999999995]6h5h, 6d5d, 6s5s, 6c5c[/6.9758401999999995], [7.941557809999999]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/7.941557809999999], [9.23075646]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/9.23075646], [13.83600542]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/13.83600542], [15.71680057]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/15.71680057], [16.45714008]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/16.45714008], [33.60830729]AhQh, AdQd, AsQs, AcQc[/33.60830729], [42.95204254]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/42.95204254]"
      },
      call: {
        '15bb': "[12.99020339]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/12.99020339], [22.67277298]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/22.67277298]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
