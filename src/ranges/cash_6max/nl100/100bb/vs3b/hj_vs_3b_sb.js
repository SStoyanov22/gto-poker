// HJ vs 3b SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs 3b SB",
  description: "HJ faces 3-bet from SB — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '12bb': "",
      },
    },
    '2.25bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '12bb': "",
      },
    },
    '2.5bb': {
      raise: {
        '24bb': "[1.2550000000000001]Ah6h, Ad6d, As6s, Ac6c[/1.2550000000000001], [2.56114]KhQh, KdQd, KsQs, KcQc[/2.56114], [2.70711]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/2.70711], [6.96307]Ah4h, Ad4d, As4s, Ac4c[/6.96307], [7.04596]Kh9h, Kd9d, Ks9s, Kc9c[/7.04596], [13.751199999999999]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/13.751199999999999], [20.263]Ah9h, Ad9d, As9s, Ac9c[/20.263], [26.226399999999998]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/26.226399999999998], [26.9229]Ah7h, Ad7d, As7s, Ac7c[/26.9229], [28.3373]Ah8h, Ad8d, As8s, Ac8c[/28.3373], [28.433799999999998]AhJh, AdJd, AsJs, AcJc[/28.433799999999998], [36.017667780000004]Kh5h, Kd5d, Ks5s, Kc5c[/36.017667780000004], [36.743900000000004]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/36.743900000000004], [38.7185]Ah5h, Ad5d, As5s, Ac5c[/38.7185], [39.582699999999996]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/39.582699999999996], [40.4307]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/40.4307], [66.7256]KhTh, KdTd, KsTs, KcTc[/66.7256], [82.676]KhJh, KdJd, KsJs, KcJc[/82.676], [99.9971]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.9971], [99.9984]AhKh, AdKd, AsKs, AcKc[/99.9984], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs",
        '100bb': "[18.0706]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/18.0706], [21.448900000000002]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/21.448900000000002], [18.0706]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/18.0706], [21.448900000000002]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/21.448900000000002]"
      },
      call: {
        '12bb': "[0.5093543]8h7h, 8d7d, 8s7s, 8c7c[/0.5093543], [3.2780769000000003]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/3.2780769000000003], [6.972589999999999]KhTh, KdTd, KsTs, KcTc[/6.972589999999999], [8.415326839999999]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/8.415326839999999], [10.00917878]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/10.00917878], [12.648499999999999]QhJh, QdJd, QsJs, QcJc[/12.648499999999999], [14.79458327]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/14.79458327], [14.963899999999999]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/14.963899999999999], [17.323900000000002]KhJh, KdJd, KsJs, KcJc[/17.323900000000002], [22.63725488]7h6h, 7d6d, 7s6s, 7c6c[/22.63725488], [24.3846]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/24.3846], [24.6739]Ah5h, Ad5d, As5s, Ac5c[/24.6739], [24.85687514]6h5h, 6d5d, 6s5s, 6c5c[/24.85687514], [26.5157]5h4h, 5d4d, 5s4s, 5c4c[/26.5157], [28.2172]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/28.2172], [29.556900000000002]Th9h, Td9d, Ts9s, Tc9c[/29.556900000000002], [37.008799999999994]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/37.008799999999994], [37.878699999999995]JhTh, JdTd, JsTs, JcTc[/37.878699999999995], [38.968399999999995]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/38.968399999999995], [40.5651]AhTh, AdTd, AsTs, AcTc[/40.5651], [41.4987]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/41.4987], [57.210899999999995]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/57.210899999999995], [71.56620000000001]AhJh, AdJd, AsJs, AcJc[/71.56620000000001], [73.77359999999999]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/73.77359999999999], [97.4388]KhQh, KdQd, KsQs, KcQc[/97.4388], AhQh, AdQd, AsQs, AcQc",
      },
    },
    '3bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '12bb': "",
      },
    },
  }
}
