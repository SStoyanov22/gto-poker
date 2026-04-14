// CO vs 3b BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs 3b BB",
  description: "CO faces 3-bet from BB — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '13bb': "",
      },
    },
    '2.25bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '13bb': "",
      },
    },
    '2.5bb': {
      raise: {
        '26bb': "[0.931483]Kh8h, Kd8d, Ks8s, Kc8c[/0.931483], [5.21956]Kh5h, Kd5d, Ks5s, Kc5c[/5.21956], [6.946910000000001]Ah4h, Ad4d, As4s, Ac4c[/6.946910000000001], [8.79086]Ah6h, Ad6d, As6s, Ac6c[/8.79086], [11.9148]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/11.9148], [16.197400000000002]Ah3h, Ad3d, As3s, Ac3c[/16.197400000000002], [16.522000000000002]Ah5h, Ad5d, As5s, Ac5c[/16.522000000000002], [17.0647]Kh6h, Kd6d, Ks6s, Kc6c[/17.0647], [19.8121]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/19.8121], [31.9205]Ah7h, Ad7d, As7s, Ac7c[/31.9205], [32.1204]KhTh, KdTd, KsTs, KcTc[/32.1204], [32.2482]Kh9h, Kd9d, Ks9s, Kc9c[/32.2482], [37.7793]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/37.7793], [53.602000000000004]Ah9h, Ad9d, As9s, Ac9c[/53.602000000000004], [55.5252]Ah8h, Ad8d, As8s, Ac8c[/55.5252], [69.6666]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/69.6666], [74.6982]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/74.6982], [89.04729999999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/89.04729999999999], [89.07650000000001]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/89.07650000000001], [98.3501]AhKh, AdKd, AsKs, AcKc[/98.3501], [99.9999]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.9999]",
        '100bb': "[2.38979]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/2.38979], [4.7245099999999995]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/4.7245099999999995]",
      },
      call: {
        '13bb': "[1.6498599999999999]AhKh, AdKd, AsKs, AcKc[/1.6498599999999999], [4.84601]Ah8h, Ad8d, As8s, Ac8c[/4.84601], [5.51539279]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/5.51539279], [10.9235]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/10.9235], [10.9527]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/10.9527], [12.0701]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/12.0701], [14.725264990000001]5h4h, 5d4d, 5s4s, 5c4c[/14.725264990000001], [14.8423]Ah4h, Ad4d, As4s, Ac4c[/14.8423], [17.8007]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/17.8007], [17.918200000000002]Th9h, Td9d, Ts9s, Tc9c[/17.918200000000002], [18.54958715]8h7h, 8d7d, 8s7s, 8c7c[/18.54958715], [19.74440436]6h5h, 6d5d, 6s5s, 6c5c[/19.74440436], [20.5773]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/20.5773], [26.1025]JhTh, JdTd, JsTs, JcTc[/26.1025], [26.985929279999997]7h6h, 7d6d, 7s6s, 7c6c[/26.985929279999997], [30.333399999999997]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/30.333399999999997], [33.3281]Ah9h, Ad9d, As9s, Ac9c[/33.3281], [41.397600000000004]QhTh, QdTd, QsTs, QcTc[/41.397600000000004], [42.6314]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/42.6314], [45.1674]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/45.1674], [58.318000000000005]Ah5h, Ad5d, As5s, Ac5c[/58.318000000000005], [59.8309]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/59.8309], [61.008300000000006]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/61.008300000000006], [67.8755]KhTh, KdTd, KsTs, KcTc[/67.8755], [69.2349]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/69.2349], [79.8086]QhJh, QdJd, QsJs, QcJc[/79.8086], [99.9609]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/99.9609], [99.9905]AhTh, AdTd, AsTs, AcTc[/99.9905], [99.9996]KhJh, KdJd, KsJs, KcJc[/99.9996], AhQh, AdQd, AsQs, AcQc, KhQh, KdQd, KsQs, KcQc, AhJh, AdJd, AsJs, AcJc",
      },
    },
    '3bb': {
      raise: {
        '22bb': "",
      },
      call: {
        '13bb': "",
      },
    },
  }
}
