// BTN vs UTG+HJ (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs UTG+HJ",
  description: "BTN faces UTG raise + HJ call — 6-max, 100bb",
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
        '11bb' : "[1.60978]Kh6h, Kd6d, Ks6s, Kc6c[/1.60978], [8.632819999999999]Ah8h, Ad8d, As8s, Ac8c[/8.632819999999999], [12.5892]7h6h, 7d6d, 7s6s, 7c6c[/12.5892], [13.414599999999998]5h4h, 5d4d, 5s4s, 5c4c[/13.414599999999998], [16.578699999999998]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/16.578699999999998], [18.619]Kh8h, Kd8d, Ks8s, Kc8c[/18.619], [18.675800000000002]Kh9h, Kd9d, Ks9s, Kc9c[/18.675800000000002], [18.7807]6h5h, 6d5d, 6s5s, 6c5c[/18.7807], [21.7057]AhTh, AdTd, AsTs, AcTc[/21.7057], [23.9665]AhJh, AdJd, AsJs, AcJc[/23.9665], [25.4294]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/25.4294], [26.2378]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/26.2378], [33.320100000000004]KhTh, KdTd, KsTs, KcTc[/33.320100000000004], [33.5329]QhJh, QdJd, QsJs, QcJc[/33.5329], [39.6316]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/39.6316], [40.3009]AhQh, AdQd, AsQs, AcQc[/40.3009], [46.1865]Ah3h, Ad3d, As3s, Ac3c[/46.1865], [49.2052]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/49.2052], [60.36749999999999]Ah5h, Ad5d, As5s, Ac5c[/60.36749999999999], [64.5224]KhJh, KdJd, KsJs, KcJc[/64.5224], [74.1361]Ah4h, Ad4d, As4s, Ac4c[/74.1361], [90.6919]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/90.6919], [90.905]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/90.905], [90.96220000000001]KhQh, KdQd, KsQs, KcQc[/90.96220000000001], [99.9876]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.9876], [99.9886]AhKh, AdKd, AsKs, AcKc[/99.9886], [99.9995]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.9995], [99.9999]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/99.9999]"
      },
      call: {
        '2.5bb': "[0.872615]Th9h, Td9d, Ts9s, Tc9c[/0.872615], [1.8287000000000002]Ah2h, Ad2d, As2s, Ac2c[/1.8287000000000002], [4.14067]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/4.14067], [7.81817]6h4h, 6d4d, 6s4s, 6c4c[/7.81817], [8.45804]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/8.45804], [9.03779]KhQh, KdQd, KsQs, KcQc[/9.03779], [9.3079]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/9.3079], [9.98221]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/9.98221], [15.457199999999998]QhTh, QdTd, QsTs, QcTc[/15.457199999999998], [16.4101]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/16.4101], [18.3305]7h6h, 7d6d, 7s6s, 7c6c[/18.3305], [18.4496]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/18.4496], [18.793699999999998]AhTh, AdTd, AsTs, AcTc[/18.793699999999998], [19.2137]JhTh, JdTd, JsTs, JcTc[/19.2137], [22.0767]QhJh, QdJd, QsJs, QcJc[/22.0767], [22.078300000000002]Ah4h, Ad4d, As4s, Ac4c[/22.078300000000002], [25.481199999999998]Ah3h, Ad3d, As3s, Ac3c[/25.481199999999998], [25.8811]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/25.8811], [29.254799999999996]KhTh, KdTd, KsTs, KcTc[/29.254799999999996], [35.4698]KhJh, KdJd, KsJs, KcJc[/35.4698], [35.7271]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/35.7271], [39.4651]Ah5h, Ad5d, As5s, Ac5c[/39.4651], [44.661899999999996]5h4h, 5d4d, 5s4s, 5c4c[/44.661899999999996], [48.9016]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/48.9016], [54.98309999999999]6h5h, 6d5d, 6s5s, 6c5c[/54.98309999999999], [59.4414]AhQh, AdQd, AsQs, AcQc[/59.4414], [60.3672]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/60.3672], [73.7614]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/73.7614], [74.5705]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/74.5705], [75.779]AhJh, AdJd, AsJs, AcJc[/75.779], [99.51689999999999]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/99.51689999999999]"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
