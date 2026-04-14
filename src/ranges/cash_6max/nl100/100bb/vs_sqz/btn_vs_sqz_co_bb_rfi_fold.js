// BTN vs sqz CO+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz CO+BB (RFI fold)",
  description: "BTN cold called CO, faces BB squeeze, CO folded — 6-max, 100bb",
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
        '100bb': "[1.52773]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.52773], [5.30614405]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/5.30614405], [7.77788006]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/7.77788006], [23.90534841]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/23.90534841]"
      },
      call: {
        '15bb': "[1.59855569]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.59855569], [1.6693277499999999]Ah5h, Ad5d, As5s, Ac5c[/1.6693277499999999], [2.78975667]JhTh, JdTd, JsTs, JcTc[/2.78975667], [2.88067648]Th9h, Td9d, Ts9s, Tc9c[/2.88067648], [3.8847867299999996]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/3.8847867299999996], [3.9516535499999996]6h5h, 6d5d, 6s5s, 6c5c[/3.9516535499999996], [4.83161994]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/4.83161994], [4.9401563500000005]5h4h, 5d4d, 5s4s, 5c4c[/4.9401563500000005], [6.295301820000001]7h6h, 7d6d, 7s6s, 7c6c[/6.295301820000001], [7.1638983099999995]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/7.1638983099999995], [7.845251]KhTh, KdTd, KsTs, KcTc[/7.845251], [7.906830820000001]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/7.906830820000001], [7.98056268]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/7.98056268], [9.28632912]AhTh, AdTd, AsTs, AcTc[/9.28632912], [15.47282291]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/15.47282291], [17.03651886]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/17.03651886], [20.00750767]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/20.00750767], [23.07197494]KhJh, KdJd, KsJs, KcJc[/23.07197494], [33.04986695]KhQh, KdQd, KsQs, KcQc[/33.04986695], [35.39038766]AhJh, AdJd, AsJs, AcJc[/35.39038766]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
