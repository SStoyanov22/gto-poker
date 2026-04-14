// HJ vs 3b BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs 3b BB",
  description: "HJ faces 3-bet from BB — 6-max, 100bb",
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
        '26bb': "[2.92334]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/2.92334], [9.37629]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/9.37629], [12.1119]Ah3h, Ad3d, As3s, Ac3c[/12.1119], [13.439799999999998]Ah8h, Ad8d, As8s, Ac8c[/13.439799999999998], [15.849809800000001]Kh5h, Kd5d, Ks5s, Kc5c[/15.849809800000001], [16.936300000000003]KhTh, KdTd, KsTs, KcTc[/16.936300000000003], [19.6966]KhJh, KdJd, KsJs, KcJc[/19.6966], [20.9694]AhTh, AdTd, AsTs, AcTc[/20.9694], [23.1887]Ah7h, Ad7d, As7s, Ac7c[/23.1887], [25.266]Ah6h, Ad6d, As6s, Ac6c[/25.266], [25.953300000000002]Kh9h, Kd9d, Ks9s, Kc9c[/25.953300000000002], [27.1317]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/27.1317], [29.521900000000002]Ah9h, Ad9d, As9s, Ac9c[/29.521900000000002], [33.7181]Ah2h, Ad2d, As2s, Ac2c[/33.7181], [37.8557]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/37.8557], [46.130900000000004]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/46.130900000000004], [65.3232]AhKh, AdKd, AsKs, AcKc[/65.3232], [75.52590000000001]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/75.52590000000001], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs",
        '100bb': "[23.6979]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/23.6979], [32.3895]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/32.3895]"
      },
      call: {
        '13bb': "[0.776181]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/0.776181], [1.5911417099999998]9h8h, 9d8d, 9s8s, 9c8c[/1.5911417099999998], [4.79759451]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/4.79759451], [7.719847689999999]8h7h, 8d7d, 8s7s, 8c7c[/7.719847689999999], [9.79024]Ah4h, Ad4d, As4s, Ac4c[/9.79024], [10.0533]Ah9h, Ad9d, As9s, Ac9c[/10.0533], [11.49349184]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/11.49349184], [13.1285]Ah8h, Ad8d, As8s, Ac8c[/13.1285], [14.030500000000002]JhTh, JdTd, JsTs, JcTc[/14.030500000000002], [15.33572631]5h4h, 5d4d, 5s4s, 5c4c[/15.33572631], [16.537399999999998]QhTh, QdTd, QsTs, QcTc[/16.537399999999998], [20.2846074]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/20.2846074], [20.343600000000002]KhTh, KdTd, KsTs, KcTc[/20.343600000000002], [22.477800000000002]Th9h, Td9d, Ts9s, Tc9c[/22.477800000000002], [22.63734544]7h6h, 7d6d, 7s6s, 7c6c[/22.63734544], [24.64477122]6h5h, 6d5d, 6s5s, 6c5c[/24.64477122], [28.2852]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/28.2852], [29.7547]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/29.7547], [34.6767]AhKh, AdKd, AsKs, AcKc[/34.6767], [35.0057]QhJh, QdJd, QsJs, QcJc[/35.0057], [36.0697]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/36.0697], [45.083800000000004]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/45.083800000000004], [47.2226]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/47.2226], [54.755900000000004]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/54.755900000000004], [55.9397]Ah5h, Ad5d, As5s, Ac5c[/55.9397], [60.0997]KhJh, KdJd, KsJs, KcJc[/60.0997], [72.86829999999999]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/72.86829999999999], [79.0164]AhTh, AdTd, AsTs, AcTc[/79.0164], [90.6237]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/90.6237], AhQh, AdQd, AsQs, AcQc, KhQh, KdQd, KsQs, KcQc, AhJh, AdJd, AsJs, AcJc",
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
