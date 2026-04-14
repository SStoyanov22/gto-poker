// CO vs 3b SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs 3b SB",
  description: "CO faces 3-bet from SB — 6-max, 100bb",
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
        '24bb': "[1.64918]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/1.64918], [4.74405]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/4.74405], [8.3036]Ah8h, Ad8d, As8s, Ac8c[/8.3036], [10.5292]Kh9h, Kd9d, Ks9s, Kc9c[/10.5292], [12.027000000000001]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/12.027000000000001], [14.6092]Ah7h, Ad7d, As7s, Ac7c[/14.6092], [22.544900000000002]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/22.544900000000002], [22.9395]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/22.9395], [27.1542]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/27.1542], [27.299]Kh5h, Kd5d, Ks5s, Kc5c[/27.299], [27.656599999999997]Ah5h, Ad5d, As5s, Ac5c[/27.656599999999997], [29.562699999999996]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/29.562699999999996], [60.846500000000006]KhTh, KdTd, KsTs, KcTc[/60.846500000000006], [62.7401]AhTh, AdTd, AsTs, AcTc[/62.7401], [69.026]KhJh, KdJd, KsJs, KcJc[/69.026], [72.2369]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/72.2369], [72.84]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/72.84], [77.8943]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/77.8943], [95.1752]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/95.1752], [95.31389999999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/95.31389999999999], [98.56970000000001]AhKh, AdKd, AsKs, AcKc[/98.56970000000001], KdKh, KsKh, KcKh, KsKd, KcKd, KcKs",
        '100bb': "[0.509986]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/0.509986], [0.608329]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/0.608329]"
      },
      call: {
        '12bb': "[0.8513410000000001]9h8h, 9d8d, 9s8s, 9c8c[/0.8513410000000001], [1.4303299999999999]AhKh, AdKd, AsKs, AcKc[/1.4303299999999999], [2.44311524]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/2.44311524], [3.0777958]8h7h, 8d7d, 8s7s, 8c7c[/3.0777958], [3.75031]QhJh, QdJd, QsJs, QcJc[/3.75031], [4.68607]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/4.68607], [4.82481]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/4.82481], [10.73966185]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/10.73966185], [11.1209]Ah5h, Ad5d, As5s, Ac5c[/11.1209], [13.411000000000001]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/13.411000000000001], [15.836500000000001]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/15.836500000000001], [21.4974]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/21.4974], [23.92223578]7h6h, 7d6d, 7s6s, 7c6c[/23.92223578], [26.7403]QhTh, QdTd, QsTs, QcTc[/26.7403], [27.089800000000004]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/27.089800000000004], [27.253100000000003]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/27.253100000000003], [27.479673180000002]6h5h, 6d5d, 6s5s, 6c5c[/27.479673180000002], [28.346100000000003]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/28.346100000000003], [29.04755611]5h4h, 5d4d, 5s4s, 5c4c[/29.04755611], [30.5021]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/30.5021], [30.974]KhJh, KdJd, KsJs, KcJc[/30.974], [32.826499999999996]Th9h, Td9d, Ts9s, Tc9c[/32.826499999999996], [34.983799999999995]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/34.983799999999995], [37.1858]AhTh, AdTd, AsTs, AcTc[/37.1858], [39.1535]KhTh, KdTd, KsTs, KcTc[/39.1535], [45.4679]JhTh, JdTd, JsTs, JcTc[/45.4679], [59.301700000000004]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/59.301700000000004], [70.43730000000001]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/70.43730000000001], AhQh, AdQd, AsQs, AcQc, KhQh, KdQd, KsQs, KcQc, AhJh, AdJd, AsJs, AcJc",
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
