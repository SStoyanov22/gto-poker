// CO vs sqz SB+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz SB+BB",
  description: "CO faces squeeze — SB called, BB squeezed — 6-max, 100bb",
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
        '24bb': "[0.652494]KhTh, KdTd, KsTs, KcTc[/0.652494], [0.8243210000000001]KhJh, KdJd, KsJs, KcJc[/0.8243210000000001], [1.01443]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/1.01443], [1.47379]Kh6h, Kd6d, Ks6s, Kc6c[/1.47379], [9.28162]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/9.28162], [10.1013]Ah6h, Ad6d, As6s, Ac6c[/10.1013], [13.017000000000001]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/13.017000000000001], [15.295200000000001]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/15.295200000000001], [15.3375]Ah4h, Ad4d, As4s, Ac4c[/15.3375], [17.3813]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/17.3813], [25.09]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/25.09], [27.853299999999997]Ah5h, Ad5d, As5s, Ac5c[/27.853299999999997], [35.7428]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/35.7428], [36.1676]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/36.1676], [36.2159]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/36.2159], [65.3614]Ah9h, Ad9d, As9s, Ac9c[/65.3614], [66.9803]Kh9h, Kd9d, Ks9s, Kc9c[/66.9803], [67.24799999999999]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/67.24799999999999], [68.0025]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/68.0025], [73.8248]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/73.8248], [74.2933]AhKh, AdKd, AsKs, AcKc[/74.2933], [99.8836]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.8836], ",
        '100bb': "[10.0491]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/10.0491], [10.7863]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/10.7863], [13.6853]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/13.6853], [25.7349]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/25.7349], [28.272100000000002]AhJh, AdJd, AsJs, AcJc[/28.272100000000002], ",
      },
      call: {
        '12bb': "[0.575362]QhTh, QdTd, QsTs, QcTc[/0.575362], [4.0498721799999995]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/4.0498721799999995], [7.01707]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/7.01707], [10.028792840000001]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/10.028792840000001], [12.859499999999999]Ah3h, Ad3d, As3s, Ac3c[/12.859499999999999], [13.723199999999999]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/13.723199999999999], [16.895124510000002]7h6h, 7d6d, 7s6s, 7c6c[/16.895124510000002], [25.700699999999998]AhKh, AdKd, AsKs, AcKc[/25.700699999999998], [26.175199999999997]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/26.175199999999997], [28.30826589]6h5h, 6d5d, 6s5s, 6c5c[/28.30826589], [31.997500000000002]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/31.997500000000002], [33.23118541]5h4h, 5d4d, 5s4s, 5c4c[/33.23118541], [35.246100000000006]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/35.246100000000006], [39.1085]Th9h, Td9d, Ts9s, Tc9c[/39.1085], [50.0988]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/50.0988], [51.2814]Ah4h, Ad4d, As4s, Ac4c[/51.2814], [52.6701]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/52.6701], [57.86409999999999]Ah5h, Ad5d, As5s, Ac5c[/57.86409999999999], [59.10680000000001]JhTh, JdTd, JsTs, JcTc[/59.10680000000001], [60.1401]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/60.1401], [63.8324]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/63.8324], [71.7094]AhJh, AdJd, AsJs, AcJc[/71.7094], [74.8399]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/74.8399], [76.19369999999999]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/76.19369999999999], [88.9364]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/88.9364], [97.1981]QhJh, QdJd, QsJs, QcJc[/97.1981], [99.142]KhTh, KdTd, KsTs, KcTc[/99.142], [99.175]KhJh, KdJd, KsJs, KcJc[/99.175], [99.515]AhTh, AdTd, AsTs, AcTc[/99.515], [99.9391]KhQh, KdQd, KsQs, KcQc[/99.9391], [99.99900000000001]AhQh, AdQd, AsQs, AcQc[/99.99900000000001], "
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
