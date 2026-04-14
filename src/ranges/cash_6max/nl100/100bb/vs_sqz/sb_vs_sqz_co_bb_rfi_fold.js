// SB vs sqz CO+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs sqz CO+BB (RFI fold)",
  description: "SB cold called CO, faces BB squeeze, CO folded — 6-max, 100bb",
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
        '100bb': "[0.70083453]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/0.70083453], [1.06754189]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/1.06754189], [3.06282775]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/3.06282775], [14.78685965]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/14.78685965], [36.45287312]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/36.45287312]"
      },
      call: {
        '12bb': "[0.65771877]QhJh, QdJd, QsJs, QcJc[/0.65771877], [0.71590856]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/0.71590856], [0.72174494]5h4h, 5d4d, 5s4s, 5c4c[/0.72174494], [0.92183649]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/0.92183649], [0.9800685499999999]6h5h, 6d5d, 6s5s, 6c5c[/0.9800685499999999], [1.10023944]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.10023944], [1.46210388]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.46210388], [1.4708150999999998]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/1.4708150999999998], [1.9014347]AhTh, AdTd, AsTs, AcTc[/1.9014347], [2.32733437]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/2.32733437], [2.43339188]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/2.43339188], [3.27179207]KhJh, KdJd, KsJs, KcJc[/3.27179207], [5.843616079999999]KhQh, KdQd, KsQs, KcQc[/5.843616079999999], [7.879557299999999]AhJh, AdJd, AsJs, AcJc[/7.879557299999999]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
