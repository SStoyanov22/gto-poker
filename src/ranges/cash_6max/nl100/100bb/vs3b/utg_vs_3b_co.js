// UTG vs 3b CO (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "UTG vs 3b CO",
  description: "UTG faces 3-bet from CO — 6-max, 100bb",
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
        '22bb': "[0.729677]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/0.729677], [0.81344109]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/0.81344109], [0.894606]Ah3h, Ad3d, As3s, Ac3c[/0.894606], [1.51074]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/1.51074], [3.81348]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/3.81348], [8.89348097]Kh6h, Kd6d, Ks6s, Kc6c[/8.89348097], [9.806470000000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/9.806470000000001], [10.674]Ah8h, Ad8d, As8s, Ac8c[/10.674], [10.7369]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/10.7369], [11.3634]AhTh, AdTd, AsTs, AcTc[/11.3634], [14.712200000000001]Ah7h, Ad7d, As7s, Ac7c[/14.712200000000001], [19.3809]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/19.3809], [30.9413]Ah4h, Ad4d, As4s, Ac4c[/30.9413], [34.5949]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/34.5949], [37.186099999999996]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/37.186099999999996], [45.716]KhQh, KdQd, KsQs, KcQc[/45.716], [57.253299999999996]KhTh, KdTd, KsTs, KcTc[/57.253299999999996], [59.9642]Ah5h, Ad5d, As5s, Ac5c[/59.9642], [60.7808]AhJh, AdJd, AsJs, AcJc[/60.7808], [66.0286]KhJh, KdJd, KsJs, KcJc[/66.0286], [67.489]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/67.489], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc",
        '100bb': "[17.9833]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/17.9833], [32.511]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/32.511], [70.5505]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/70.5505]",
      },
      call: {
        '8bb': "[3.4874877300000002]9h8h, 9d8d, 9s8s, 9c8c[/3.4874877300000002], [10.1295]Ah4h, Ad4d, As4s, Ac4c[/10.1295], [11.984]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/11.984], [12.74410876]8h7h, 8d7d, 8s7s, 8c7c[/12.74410876], [13.255700000000001]KhTh, KdTd, KsTs, KcTc[/13.255700000000001], [19.3224261]7h6h, 7d6d, 7s6s, 7c6c[/19.3224261], [19.643]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/19.643], [19.912399999999998]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/19.912399999999998], [20.63057804]Th9h, Td9d, Ts9s, Tc9c[/20.63057804], [22.7827]Ah5h, Ad5d, As5s, Ac5c[/22.7827], [26.06629573]5h4h, 5d4d, 5s4s, 5c4c[/26.06629573], [26.720699999999997]6h5h, 6d5d, 6s5s, 6c5c[/26.720699999999997], [33.9712]KhJh, KdJd, KsJs, KcJc[/33.9712], [35.604400000000005]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/35.604400000000005], [37.080200000000005]JhTh, JdTd, JsTs, JcTc[/37.080200000000005], [39.2192]AhJh, AdJd, AsJs, AcJc[/39.2192], [41.4525]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/41.4525], [42.75981077]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/42.75981077], [43.60670818]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/43.60670818], [44.8306]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/44.8306], [45.123999999999995]AhTh, AdTd, AsTs, AcTc[/45.123999999999995], [54.2812]KhQh, KdQd, KsQs, KcQc[/54.2812], [55.6471]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/55.6471], [69.1968]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/69.1968], [80.6192]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/80.6192], [99.9995]AhQh, AdQd, AsQs, AcQc[/99.9995]",
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
