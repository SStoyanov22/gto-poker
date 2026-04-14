// HJ vs sqz SB+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz SB+BB",
  description: "HJ faces squeeze — SB called, BB squeezed — 6-max, 100bb",
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
        '24bb': "[0.8463719999999999]Kh7h, Kd7d, Ks7s, Kc7c[/0.8463719999999999], [1.18785]KhJh, KdJd, KsJs, KcJc[/1.18785], [2.96482442]Kh5h, Kd5d, Ks5s, Kc5c[/2.96482442], [3.2115699999999996]Ah4h, Ad4d, As4s, Ac4c[/3.2115699999999996], [3.4679599999999997]Ah7h, Ad7d, As7s, Ac7c[/3.4679599999999997], [3.90962]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/3.90962], [6.33266]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/6.33266], [6.93334]Ah3h, Ad3d, As3s, Ac3c[/6.93334], [8.46518]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/8.46518], [15.5687]Ah8h, Ad8d, As8s, Ac8c[/15.5687], [18.7849]Ah6h, Ad6d, As6s, Ac6c[/18.7849], [28.2326]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/28.2326], [30.4147]Ah5h, Ad5d, As5s, Ac5c[/30.4147], [33.5208]Kh9h, Kd9d, Ks9s, Kc9c[/33.5208], [34.5098]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/34.5098], [43.594100000000005]AhTh, AdTd, AsTs, AcTc[/43.594100000000005], [44.2731]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/44.2731], [45.689600000000006]KhTh, KdTd, KsTs, KcTc[/45.689600000000006], [49.9313]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/49.9313], [51.3238]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/51.3238], [57.237899999999996]AhKh, AdKd, AsKs, AcKc[/57.237899999999996], [80.9039]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/80.9039], [90.8413]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/90.8413]",
        '100bb': "[13.997599999999998]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/13.997599999999998], [22.9466]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/22.9466], [40.6534]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/40.6534], "
      },
      call: {
        '12bb': "[3.5512902]8h7h, 8d7d, 8s7s, 8c7c[/3.5512902], [8.02274]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/8.02274], [9.15875]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/9.15875], [13.9967]Th9h, Td9d, Ts9s, Tc9c[/13.9967], [19.0961]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/19.0961], [22.589261259999997]7h6h, 7d6d, 7s6s, 7c6c[/22.589261259999997], [22.867199999999997]JhTh, JdTd, JsTs, JcTc[/22.867199999999997], [23.310506359999998]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/23.310506359999998], [23.39662213]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/23.39662213], [24.855010880000002]6h5h, 6d5d, 6s5s, 6c5c[/24.855010880000002], [26.513790869999998]5h4h, 5d4d, 5s4s, 5c4c[/26.513790869999998], [28.422199999999997]Ah4h, Ad4d, As4s, Ac4c[/28.422199999999997], [29.8453]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/29.8453], [32.3895]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/32.3895], [36.5001]QhTh, QdTd, QsTs, QcTc[/36.5001], [42.7537]AhKh, AdKd, AsKs, AcKc[/42.7537], [45.2564]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/45.2564], [49.0918]Ah5h, Ad5d, As5s, Ac5c[/49.0918], [51.4925]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/51.4925], [53.222100000000005]KhTh, KdTd, KsTs, KcTc[/53.222100000000005], [54.241099999999996]AhTh, AdTd, AsTs, AcTc[/54.241099999999996], [55.7261]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/55.7261], [68.5882]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/68.5882], [71.73519999999999]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/71.73519999999999], [78.97149999999999]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/78.97149999999999], [98.5401]KhJh, KdJd, KsJs, KcJc[/98.5401], [99.93459999999999]AhJh, AdJd, AsJs, AcJc[/99.93459999999999], [99.9981]KhQh, KdQd, KsQs, KcQc[/99.9981], [99.9999]AhQh, AdQd, AsQs, AcQc[/99.9999]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
