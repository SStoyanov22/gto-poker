// UTG vs 3b BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs 3b BTN",
  description: "UTG faces 3-bet from BTN — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: {
        '24bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
    '2.25bb': {
      raise: {
        '24bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
    '2.5bb': {
      raise: {
        '22bb': "[2.64954]Ah3h, Ad3d, As3s, Ac3c[/2.64954], [5.84822199]Kh6h, Kd6d, Ks6s, Kc6c[/5.84822199], [6.28953]Kh9h, Kd9d, Ks9s, Kc9c[/6.28953], [8.62937]Ah8h, Ad8d, As8s, Ac8c[/8.62937], [9.39142]Ah9h, Ad9d, As9s, Ac9c[/9.39142], [10.081900000000001]Ah7h, Ad7d, As7s, Ac7c[/10.081900000000001], [16.6567]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/16.6567], [17.8004]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/17.8004], [20.072200000000002]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/20.072200000000002], [34.299800000000005]AhTh, AdTd, AsTs, AcTc[/34.299800000000005], [36.2575]Ah4h, Ad4d, As4s, Ac4c[/36.2575], [36.3796]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/36.3796], [38.6848]KhQh, KdQd, KsQs, KcQc[/38.6848], [40.6546]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/40.6546], [48.8814]AhJh, AdJd, AsJs, AcJc[/48.8814], [55.8855]Ah5h, Ad5d, As5s, Ac5c[/55.8855], [69.24759999999999]KhTh, KdTd, KsTs, KcTc[/69.24759999999999], [70.73819999999999]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/70.73819999999999], [71.3605]KhJh, KdJd, KsJs, KcJc[/71.3605], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc",
        '100bb': "[13.8215]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/13.8215], [29.261799999999997]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/29.261799999999997], [60.740300000000005]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/60.740300000000005]",
      },
      call: {
        '8bb': "[3.38421183]9h8h, 9d8d, 9s8s, 9c8c[/3.38421183], [10.6678]Ah4h, Ad4d, As4s, Ac4c[/10.6678], [11.984]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/11.984], [12.745600000000001]8h7h, 8d7d, 8s7s, 8c7c[/12.745600000000001], [14.525099999999998]Ah9h, Ad9d, As9s, Ac9c[/14.525099999999998], [18.1814]QhJh, QdJd, QsJs, QcJc[/18.1814], [18.7702545]Th9h, Td9d, Ts9s, Tc9c[/18.7702545], [19.1875]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/19.1875], [19.23437301]7h6h, 7d6d, 7s6s, 7c6c[/19.23437301], [19.912399999999998]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/19.912399999999998], [21.6804]KhTh, KdTd, KsTs, KcTc[/21.6804], [26.06634787]5h4h, 5d4d, 5s4s, 5c4c[/26.06634787], [26.720699999999997]6h5h, 6d5d, 6s5s, 6c5c[/26.720699999999997], [27.5332]Ah5h, Ad5d, As5s, Ac5c[/27.5332], [28.6395]KhJh, KdJd, KsJs, KcJc[/28.6395], [32.624700000000004]JhTh, JdTd, JsTs, JcTc[/32.624700000000004], [43.6745]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/43.6745], [43.7618]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/43.7618], [45.40403688]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/45.40403688], [45.5239]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/45.5239], [51.1186]AhJh, AdJd, AsJs, AcJc[/51.1186], [59.684400000000004]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/59.684400000000004], [60.638099999999994]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/60.638099999999994], [61.315200000000004]KhQh, KdQd, KsQs, KcQc[/61.315200000000004], [63.9031]AhTh, AdTd, AsTs, AcTc[/63.9031], [80.1805]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/80.1805], [83.3433]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/83.3433], AhQh, AdQd, AsQs, AcQc",
      },
    },
    '3bb': {
      raise: {
        '24bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
  }
}
