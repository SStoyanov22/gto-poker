// HJ vs 3b CO (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs 3b CO",
  description: "HJ faces 3-bet from CO — 6-max, 100bb",
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
        '22bb': "[0.909717]Ah7h, Ad7d, As7s, Ac7c[/0.909717], [1.35487]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/1.35487], [2.2921]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/2.2921], [3.77081]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/3.77081], [5.51734379]Kh5h, Kd5d, Ks5s, Kc5c[/5.51734379], [7.36452]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/7.36452], [10.362]Kh9h, Kd9d, Ks9s, Kc9c[/10.362], [12.9582]Ah8h, Ad8d, As8s, Ac8c[/12.9582], [19.37918062]Kh6h, Kd6d, Ks6s, Kc6c[/19.37918062], [24.0362]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/24.0362], [25.0913]Ah4h, Ad4d, As4s, Ac4c[/25.0913], [36.696400000000004]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/36.696400000000004], [38.5023]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/38.5023], [42.140899999999995]KhQh, KdQd, KsQs, KcQc[/42.140899999999995], [46.8443]AhTh, AdTd, AsTs, AcTc[/46.8443], [57.807900000000004]AhJh, AdJd, AsJs, AcJc[/57.807900000000004], [59.10809999999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/59.10809999999999], [60.862]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/60.862], [66.04299999999999]Ah5h, Ad5d, As5s, Ac5c[/66.04299999999999], [80.71350000000001]KhTh, KdTd, KsTs, KcTc[/80.71350000000001], [83.0367]KhJh, KdJd, KsJs, KcJc[/83.0367], [99.9944]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.9944], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc",
        '100bb': "[0.579365]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/0.579365], [33.8414]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/33.8414], [47.7335]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/47.7335]",
      },
      call: {
        '8bb': "[2.28426]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/2.28426], [3.4772999999999996]Ah9h, Ad9d, As9s, Ac9c[/3.4772999999999996], [4.61595]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/4.61595], [5.19721]Ah4h, Ad4d, As4s, Ac4c[/5.19721], [7.05046]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/7.05046], [9.19872241]8h7h, 8d7d, 8s7s, 8c7c[/9.19872241], [13.18794718]9h8h, 9d8d, 9s8s, 9c8c[/13.18794718], [13.764299999999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/13.764299999999999], [16.9632]KhJh, KdJd, KsJs, KcJc[/16.9632], [19.2419]QhJh, QdJd, QsJs, QcJc[/19.2419], [19.2865]KhTh, KdTd, KsTs, KcTc[/19.2865], [19.9826]Th9h, Td9d, Ts9s, Tc9c[/19.9826], [22.63802459]7h6h, 7d6d, 7s6s, 7c6c[/22.63802459], [22.9409]Ah5h, Ad5d, As5s, Ac5c[/22.9409], [24.8569]6h5h, 6d5d, 6s5s, 6c5c[/24.8569], [26.5157]5h4h, 5d4d, 5s4s, 5c4c[/26.5157], [27.0005]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/27.0005], [28.4041]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/28.4041], [42.192099999999996]AhJh, AdJd, AsJs, AcJc[/42.192099999999996], [42.28805638]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/42.28805638], [43.9495]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/43.9495], [44.4247]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/44.4247], [46.515299999999996]JhTh, JdTd, JsTs, JcTc[/46.515299999999996], [51.5648]AhTh, AdTd, AsTs, AcTc[/51.5648], [53.0126]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/53.0126], [57.8591]KhQh, KdQd, KsQs, KcQc[/57.8591], [61.8649]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/61.8649], [62.7243]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/62.7243], [75.9638]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/75.9638], AhQh, AdQd, AsQs, AcQc",
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
