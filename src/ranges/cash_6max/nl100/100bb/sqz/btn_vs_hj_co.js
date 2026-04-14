// BTN vs HJ+CO (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs HJ+CO",
  description: "BTN faces HJ raise + CO call — 6-max, 100bb",
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
        '11bb' : "[1.2397500000000001]Ah2h, Ad2d, As2s, Ac2c[/1.2397500000000001], [4.58373]AhTh, AdTd, AsTs, AcTc[/4.58373], [6.15477]KhTh, KdTd, KsTs, KcTc[/6.15477], [6.397899999999999]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/6.397899999999999], [6.94231]QhJd, QhJs, QhJc, QdJh, QdJs, QdJc, QsJh, QsJd, QsJc, QcJh, QcJd, QcJs[/6.94231], [19.7974]5h4h, 5d4d, 5s4s, 5c4c[/19.7974], [22.2351]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/22.2351], [23.514499999999998]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/23.514499999999998], [25.7791]6h5h, 6d5d, 6s5s, 6c5c[/25.7791], [26.116099999999996]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/26.116099999999996], [27.0056]AhQh, AdQd, AsQs, AcQc[/27.0056], [28.0332]7h6h, 7d6d, 7s6s, 7c6c[/28.0332], [28.953699999999998]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/28.953699999999998], [30.6239]Ah3h, Ad3d, As3s, Ac3c[/30.6239], [31.5255]Jh8h, Jd8d, Js8s, Jc8c[/31.5255], [43.2695]Jh9h, Jd9d, Js9s, Jc9c[/43.2695], [43.7538]KhQh, KdQd, KsQs, KcQc[/43.7538], [49.279]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/49.279], [56.9124]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/56.9124], [56.950100000000006]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/56.950100000000006], [57.993399999999994]Ah5h, Ad5d, As5s, Ac5c[/57.993399999999994], [61.610600000000005]JhTh, JdTd, JsTs, JcTc[/61.610600000000005], [75.02680000000001]AhJh, AdJd, AsJs, AcJc[/75.02680000000001], [76.22409999999999]KhJh, KdJd, KsJs, KcJc[/76.22409999999999], [79.459]Ah4h, Ad4d, As4s, Ac4c[/79.459], [93.4424]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/93.4424], [95.60419999999999]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/95.60419999999999], [97.0398]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/97.0398], [98.9388]QhJh, QdJd, QsJs, QcJc[/98.9388], [99.97019999999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.97019999999999], [99.99759999999999]AhKh, AdKd, AsKs, AcKc[/99.99759999999999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs"
      },
      call: {
        '2.5bb': "[0.526815]Ah2h, Ad2d, As2s, Ac2c[/0.526815], [1.06045]QhJh, QdJd, QsJs, QcJc[/1.06045], [2.96021]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/2.96021], [3.9351499999999997]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/3.9351499999999997], [4.2756799999999995]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/4.2756799999999995], [6.39584]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/6.39584], [7.59816]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/7.59816], [10.982]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/10.982], [15.690100000000001]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/15.690100000000001], [16.8996]QhTh, QdTd, QsTs, QcTc[/16.8996], [20.3294]7h6h, 7d6d, 7s6s, 7c6c[/20.3294], [20.485300000000002]Ah4h, Ad4d, As4s, Ac4c[/20.485300000000002], [23.7757]KhJh, KdJd, KsJs, KcJc[/23.7757], [24.973100000000002]AhJh, AdJd, AsJs, AcJc[/24.973100000000002], [25.652]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/25.652], [28.5841]Ah3h, Ad3d, As3s, Ac3c[/28.5841], [32.3768]KhTh, KdTd, KsTs, KcTc[/32.3768], [33.338699999999996]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/33.338699999999996], [34.1755]JhTh, JdTd, JsTs, JcTc[/34.1755], [39.6535]6h5h, 6d5d, 6s5s, 6c5c[/39.6535], [40.6729]5h4h, 5d4d, 5s4s, 5c4c[/40.6729], [41.2039]Ah5h, Ad5d, As5s, Ac5c[/41.2039], [56.2462]KhQh, KdQd, KsQs, KcQc[/56.2462], [59.7479]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/59.7479], [71.0463]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/71.0463], [72.9944]AhQh, AdQd, AsQs, AcQc[/72.9944], [75.568]AhTh, AdTd, AsTs, AcTc[/75.568], [76.4855]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/76.4855], [93.6021]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/93.6021]",
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
