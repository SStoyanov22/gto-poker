// CO vs 3b BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs 3b BTN",
  description: "CO faces 3-bet from BTN — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: {
        '22bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
    '2.25bb': {
      raise: {
        '22bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
    '2.5bb': {
      raise: {
        '22bb': "[6.0756499999999996]QhTh, QdTd, QsTs, QcTc[/6.0756499999999996], [6.51364753]6h5h, 6d5d, 6s5s, 6c5c[/6.51364753], [11.725]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/11.725], [12.5803]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/12.5803], [15.7212]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/15.7212], [17.5207]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/17.5207], [18.3952]Th9h, Td9d, Ts9s, Tc9c[/18.3952], [20.3812]Ah9h, Ad9d, As9s, Ac9c[/20.3812], [21.2515]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/21.2515], [23.3977]QhJh, QdJd, QsJs, QcJc[/23.3977], [24.249200000000002]Ah4h, Ad4d, As4s, Ac4c[/24.249200000000002], [29.343700000000002]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/29.343700000000002], [37.1385]Kh9h, Kd9d, Ks9s, Kc9c[/37.1385], [43.8476]Ah8h, Ad8d, As8s, Ac8c[/43.8476], [46.8845]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/46.8845], [54.3632]JhTh, JdTd, JsTs, JcTc[/54.3632], [55.759899999999995]KhTh, KdTd, KsTs, KcTc[/55.759899999999995], [63.0989]AhTh, AdTd, AsTs, AcTc[/63.0989], [65.98150000000001]Ah5h, Ad5d, As5s, Ac5c[/65.98150000000001], [82.2273]KhJh, KdJd, KsJs, KcJc[/82.2273], [85.54129999999999]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/85.54129999999999], [88.0468]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/88.0468], [91.75619999999999]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/91.75619999999999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs",
        '100bb': "[7.000439999999999]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/7.000439999999999], [11.9524]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/11.9524]",
      },
      call: {
        '8bb': "[1.24332]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/1.24332], [3.2088400000000004]Kh9h, Kd9d, Ks9s, Kc9c[/3.2088400000000004], [3.9400699999999995]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/3.9400699999999995], [6.620710000000001]Ah4h, Ad4d, As4s, Ac4c[/6.620710000000001], [13.1836]Ah8h, Ad8d, As8s, Ac8c[/13.1836], [14.458699999999999]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/14.458699999999999], [14.888925019999999]8h7h, 8d7d, 8s7s, 8c7c[/14.888925019999999], [17.7727]KhJh, KdJd, KsJs, KcJc[/17.7727], [18.57]9h8h, 9d8d, 9s8s, 9c8c[/18.57], [27.2167]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/27.2167], [28.801182139999998]6h5h, 6d5d, 6s5s, 6c5c[/28.801182139999998], [30.681445330000003]7h6h, 7d6d, 7s6s, 7c6c[/30.681445330000003], [32.5186]QhJh, QdJd, QsJs, QcJc[/32.5186], [32.9327]Ah5h, Ad5d, As5s, Ac5c[/32.9327], [33.229889140000004]5h4h, 5d4d, 5s4s, 5c4c[/33.229889140000004], [33.9593]Th9h, Td9d, Ts9s, Tc9c[/33.9593], [36.9011]AhTh, AdTd, AsTs, AcTc[/36.9011], [44.2401]KhTh, KdTd, KsTs, KcTc[/44.2401], [45.6349]JhTh, JdTd, JsTs, JcTc[/45.6349], [46.291700000000006]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/46.291700000000006], [46.8001]Ah9h, Ad9d, As9s, Ac9c[/46.8001], [47.9216]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/47.9216], [48.9071]QhTh, QdTd, QsTs, QcTc[/48.9071], [53.115500000000004]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/53.115500000000004], [57.4282]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/57.4282], [62.653099999999995]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/62.653099999999995], [76.911]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/76.911], [78.74849999999999]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/78.74849999999999], [82.4793]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/82.4793], [99.9999]KhQh, KdQd, KsQs, KcQc[/99.9999], AhQh, AdQd, AsQs, AcQc, AhJh, AdJd, AsJs, AcJc",
      },
    },
    '3bb': {
      raise: {
        '22bb': "",
        '100bb': "",
      },
      call: {
        '8bb': "",
      },
    },
  }
}
