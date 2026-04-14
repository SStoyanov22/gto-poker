// BTN vs 3b SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs 3b SB",
  description: "BTN faces 3-bet from SB — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      call: {
        '12bb': "",
      },
    },
    '2.25bb': {
      call: {
        '12bb': "",
      },
    },
    '2.5bb': {
      raise: { 
        '24bb': "[1.10463]Th9h, Td9d, Ts9s, Tc9c[/1.10463], [1.60542]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.60542], [3.38978]JhTh, JdTd, JsTs, JcTc[/3.38978], [3.74286]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/3.74286], [5.12366]Ah4h, Ad4d, As4s, Ac4c[/5.12366], [12.5682]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/12.5682], [14.9232]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/14.9232], [17.052500000000002]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/17.052500000000002], [22.2901]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/22.2901], [24.6206]Kh9h, Kd9d, Ks9s, Kc9c[/24.6206], [25.0286]AhTd, AhTs, AhTc, AdTh, AdTs, AdTc, AsTh, AsTd, AsTc, AcTh, AcTd, AcTs[/25.0286], [25.4054]KhTh, KdTd, KsTs, KcTc[/25.4054], [26.685399999999998]AhQh, AdQd, AsQs, AcQc[/26.685399999999998], [27.636899999999997]QhTh, QdTd, QsTs, QcTc[/27.636899999999997], [35.212700000000005]Ah7h, Ad7d, As7s, Ac7c[/35.212700000000005], [38.8311]Ah5h, Ad5d, As5s, Ac5c[/38.8311], [43.7392]Ah9h, Ad9d, As9s, Ac9c[/43.7392], [48.7493]Ah8h, Ad8d, As8s, Ac8c[/48.7493], [52.2464]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/52.2464], [52.2614]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/52.2614], [53.425]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/53.425], [84.16940000000001]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/84.16940000000001], [89.4418]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/89.4418], AhKh, AdKd, AsKs, AcKc, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs" ,
        '100bb': "[4.97407]Ah5h, Ad5d, As5s, Ac5c[/4.97407], [47.753499999999995]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/47.753499999999995], [54.791000000000004]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/54.791000000000004], [81.0782]QhJh, QdJd, QsJs, QcJc[/81.0782], [90.96509999999999]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/90.96509999999999]"
      },
      call: {
        '12bb': "[2.3843799999999997]Ah4h, Ad4d, As4s, Ac4c[/2.3843799999999997], [4.53813]Ah8h, Ad8d, As8s, Ac8c[/4.53813], [5.29207]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/5.29207], [7.86234]Kh9h, Kd9d, Ks9s, Kc9c[/7.86234], [8.68749]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/8.68749], [10.5582]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/10.5582], [15.8306]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/15.8306], [18.921499999999998]QhJh, QdJd, QsJs, QcJc[/18.921499999999998], [19.4788]8h7h, 8d7d, 8s7s, 8c7c[/19.4788], [23.1248]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/23.1248], [24.7439]7h6h, 7d6d, 7s6s, 7c6c[/24.7439], [26.595299999999998]5h4h, 5d4d, 5s4s, 5c4c[/26.595299999999998], [28.2378]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/28.2378], [29.384700000000002]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/29.384700000000002], [35.972300000000004]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/35.972300000000004], [37.9781]9h8h, 9d8d, 9s8s, 9c8c[/37.9781], [40.799099999999996]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/40.799099999999996], [41.1896]6h5h, 6d5d, 6s5s, 6c5c[/41.1896], [44.806000000000004]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/44.806000000000004], [51.3618]Ah5h, Ad5d, As5s, Ac5c[/51.3618], [56.2608]Ah9h, Ad9d, As9s, Ac9c[/56.2608], [66.1156]Th9h, Td9d, Ts9s, Tc9c[/66.1156], [72.20299999999999]QhTh, QdTd, QsTs, QcTc[/72.20299999999999], [72.20790000000001]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/72.20790000000001], [73.3146]AhQh, AdQd, AsQs, AcQc[/73.3146], [74.5946]KhTh, KdTd, KsTs, KcTc[/74.5946], [77.7099]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/77.7099], [78.9696]JhTh, JdTd, JsTs, JcTc[/78.9696], [85.0766]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/85.0766], [87.43180000000001]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/87.43180000000001], KhQh, KdQd, KsQs, KcQc, AhJh, AdJd, AsJs, AcJc, KhJh, KdJd, KsJs, KcJc, AhTh, AdTd, AsTs, AcTc",
      },
    },
    '3bb': {
      call: {
        '12bb': "",
      },
    },
  }
}
