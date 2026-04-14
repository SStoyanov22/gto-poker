// CO vs sqz BTN+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz BTN+BB",
  description: "CO faces squeeze — BTN called, BB squeezed — 6-max, 100bb",
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
        '30bb': "[0.7261110000000001]Kh5h, Kd5d, Ks5s, Kc5c[/0.7261110000000001], [2.25723]AhTh, AdTd, AsTs, AcTc[/2.25723], [2.44091]Ah7h, Ad7d, As7s, Ac7c[/2.44091], [13.086999999999998]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/13.086999999999998], [15.0281]AhJh, AdJd, AsJs, AcJc[/15.0281], [15.723799999999999]KhTh, KdTd, KsTs, KcTc[/15.723799999999999], [28.048499999999997]Kh9h, Kd9d, Ks9s, Kc9c[/28.048499999999997], [44.5585]Ah5h, Ad5d, As5s, Ac5c[/44.5585], [46.6704]AhQh, AdQd, AsQs, AcQc[/46.6704], [47.2917]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/47.2917], [51.5064]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/51.5064], [62.7194]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/62.7194], [63.330600000000004]KhJh, KdJd, KsJs, KcJc[/63.330600000000004], [71.6424]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/71.6424], [78.48230000000001]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/78.48230000000001], [81.8317]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/81.8317], [92.8831]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/92.8831], [99.9982]AhKh, AdKd, AsKs, AcKc[/99.9982]",
        '100bb': "[9.38865]AhQh, AdQd, AsQs, AcQc[/9.38865], [13.6768]AhJh, AdJd, AsJs, AcJc[/13.6768], [16.5204]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/16.5204], [47.153]KhQh, KdQd, KsQs, KcQc[/47.153], [48.4935]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/48.4935], [50.276900000000005]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/50.276900000000005], "
      },
      call: {
        '15bb': "[1.6479400000000002]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/1.6479400000000002], [1.91530333]7h6h, 7d6d, 7s6s, 7c6c[/1.91530333], [2.4314]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/2.4314], [3.6710100000000003]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/3.6710100000000003], [3.9371499999999995]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/3.9371499999999995], [4.16063]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/4.16063], [5.63565]JhTh, JdTd, JsTs, JcTc[/5.63565], [7.1168700000000005]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/7.1168700000000005], [8.53867]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/8.53867], [9.222497859999999]5h4h, 5d4d, 5s4s, 5c4c[/9.222497859999999], [12.67421447]6h5h, 6d5d, 6s5s, 6c5c[/12.67421447], [12.915299999999998]Ah5h, Ad5d, As5s, Ac5c[/12.915299999999998], [13.111600000000001]KhTh, KdTd, KsTs, KcTc[/13.111600000000001], [14.131599999999999]KhJh, KdJd, KsJs, KcJc[/14.131599999999999], [16.4652]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/16.4652], [17.0926]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/17.0926], [21.5177]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/21.5177], [37.2797]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/37.2797], [43.941]AhQh, AdQd, AsQs, AcQc[/43.941], [52.8464]KhQh, KdQd, KsQs, KcQc[/52.8464], [71.2925]AhJh, AdJd, AsJs, AcJc[/71.2925]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
