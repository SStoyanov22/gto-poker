// BB vs HJ+BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BB vs HJ+BTN",
  description: "BB faces HJ raise + BTN call — 6-max, 100bb",
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
        '15bb': "[0.534265]Kh9h, Kd9d, Ks9s, Kc9c[/0.534265], [1.0707]QhTh, QdTd, QsTs, QcTc[/1.0707], [1.3878599999999999]Ah7h, Ad7d, As7s, Ac7c[/1.3878599999999999], [2.0312799999999998]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/2.0312799999999998], [4.49163]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/4.49163], [8.70383]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/8.70383], [10.9774]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/10.9774], [13.6027]Ah6h, Ad6d, As6s, Ac6c[/13.6027], [17.228199999999998]8h7h, 8d7d, 8s7s, 8c7c[/17.228199999999998], [24.458199999999998]5h4h, 5d4d, 5s4s, 5c4c[/24.458199999999998], [24.9362]Ah4h, Ad4d, As4s, Ac4c[/24.9362], [26.2133]7h6h, 7d6d, 7s6s, 7c6c[/26.2133], [27.7977]Ah2h, Ad2d, As2s, Ac2c[/27.7977], [27.9976]Ah5h, Ad5d, As5s, Ac5c[/27.9976], [30.0659]6h5h, 6d5d, 6s5s, 6c5c[/30.0659], [31.3254]KhTh, KdTd, KsTs, KcTc[/31.3254], [41.4793]Jh8h, Jd8d, Js8s, Jc8c[/41.4793], [45.545]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/45.545], [46.5124]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/46.5124], [46.7323]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/46.7323], [49.4353]JhTh, JdTd, JsTs, JcTc[/49.4353], [53.3513]Ah3h, Ad3d, As3s, Ac3c[/53.3513], [55.7902]Jh9h, Jd9d, Js9s, Jc9c[/55.7902], [62.361900000000006]AhJh, AdJd, AsJs, AcJc[/62.361900000000006], [73.2213]QhJh, QdJd, QsJs, QcJc[/73.2213], [90.7061]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/90.7061], [99.9837]KhJh, KdJd, KsJs, KcJc[/99.9837], [99.9979]KhQh, KdQd, KsQs, KcQc[/99.9979], [99.9995]AhQh, AdQd, AsQs, AcQc[/99.9995], [99.9999]AhKh, AdKd, AsKs, AcKc[/99.9999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs, JdJh, JsJh, JcJh, JsJd, JcJd, JcJs"
      },
      call: {
        '2.5bb' :"[3.0747400000000003]QhJd, QhJs, QhJc, QdJh, QdJs, QdJc, QsJh, QsJd, QsJc, QcJh, QcJd, QcJs[/3.0747400000000003], [9.29386]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/9.29386], [26.7787]QhJh, QdJd, QsJs, QcJc[/26.7787], [28.4443]4h3h, 4d3d, 4s3s, 4c3c[/28.4443], [32.418400000000005]Kh8h, Kd8d, Ks8s, Kc8c[/32.418400000000005], [37.6381]AhJh, AdJd, AsJs, AcJc[/37.6381], [37.9527]Th8h, Td8d, Ts8s, Tc8c[/37.9527], [44.1254]Jh9h, Jd9d, Js9s, Jc9c[/44.1254], [46.6487]Ah3h, Ad3d, As3s, Ac3c[/46.6487], [46.9627]8h6h, 8d6d, 8s6s, 8c6c[/46.9627], [50.0702]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/50.0702], [50.564299999999996]JhTh, JdTd, JsTs, JcTc[/50.564299999999996], [53.2676]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/53.2676], [54.3648]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/54.3648], [55.8121]9h7h, 9d7d, 9s7s, 9c7c[/55.8121], [56.5249]5h3h, 5d3d, 5s3s, 5c3c[/56.5249], [65.9198]Kh9h, Kd9d, Ks9s, Kc9c[/65.9198], [68.6728]KhTh, KdTd, KsTs, KcTc[/68.6728], [69.9291]6h5h, 6d5d, 6s5s, 6c5c[/69.9291], [71.33]Ah2h, Ad2d, As2s, Ac2c[/71.33], [71.441]7h5h, 7d5d, 7s5s, 7c5c[/71.441], [72.0024]Ah5h, Ad5d, As5s, Ac5c[/72.0024], [73.161]7h6h, 7d6d, 7s6s, 7c6c[/73.161], [75.0637]Ah4h, Ad4d, As4s, Ac4c[/75.0637], [75.5417]5h4h, 5d4d, 5s4s, 5c4c[/75.5417], [77.13449999999999]6h4h, 6d4d, 6s4s, 6c4c[/77.13449999999999], [80.8013]Ah6h, Ad6d, As6s, Ac6c[/80.8013], [81.4281]8h7h, 8d7d, 8s7s, 8c7c[/81.4281], [89.0226]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/89.0226], [91.2962]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/91.2962], [95.50840000000001]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/95.50840000000001], [97.9687]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/97.9687], [98.6121]Ah7h, Ad7d, As7s, Ac7c[/98.6121], [98.9236]QhTh, QdTd, QsTs, QcTc[/98.9236], [99.03999999999999]9h8h, 9d8d, 9s8s, 9c8c[/99.03999999999999], [99.5179]Ah8h, Ad8d, As8s, Ac8c[/99.5179], [99.9046]Th9h, Td9d, Ts9s, Tc9c[/99.9046], [99.9956]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/99.9956], [99.9962]Ah9h, Ad9d, As9s, Ac9c[/99.9962], [99.9985]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/99.9985], [99.9988]AhTh, AdTd, AsTs, AcTc[/99.9988], [99.9999]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/99.9999], 3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s, 2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
