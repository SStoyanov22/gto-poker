// SB vs sqz BTN+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs sqz BTN+BB (RFI fold)",
  description: "SB cold called BTN, faces BB squeeze, BTN folded — 6-max, 100bb",
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
        '100bb': "[0.58156511]AhJh, AdJd, AsJs, AcJc[/0.58156511], [0.8578505599999999]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/0.8578505599999999], [3.20753]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/3.20753], [6.643447869999999]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/6.643447869999999], [7.94881589]KhJh, KdJd, KsJs, KcJc[/7.94881589], [10.52508714]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/10.52508714], [21.212475219999998]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/21.212475219999998]"
      },
      call: {
        '12bb': "[1.13216388]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/1.13216388], [1.1777297500000001]QhTh, QdTd, QsTs, QcTc[/1.1777297500000001], [1.21072447]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/1.21072447], [1.21744807]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.21744807], [1.93984099]Ah5h, Ad5d, As5s, Ac5c[/1.93984099], [2.03494]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/2.03494], [2.2427174]KhTh, KdTd, KsTs, KcTc[/2.2427174], [2.84181527]QhJh, QdJd, QsJs, QcJc[/2.84181527], [3.02132478]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/3.02132478], [3.57401489]AhJh, AdJd, AsJs, AcJc[/3.57401489], [5.8624487400000005]AhTh, AdTd, AsTs, AcTc[/5.8624487400000005], [5.915770859999999]KhJh, KdJd, KsJs, KcJc[/5.915770859999999]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
