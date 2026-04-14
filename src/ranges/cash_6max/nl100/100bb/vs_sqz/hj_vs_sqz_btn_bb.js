// HJ vs sqz BTN+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "HJ vs sqz BTN+BB",
  description: "HJ faces squeeze — BTN called, BB squeezed — 6-max, 100bb",
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
        '30bb': "[1.24444]Kh8h, Kd8d, Ks8s, Kc8c[/1.24444], [1.29634]Ah3h, Ad3d, As3s, Ac3c[/1.29634], [1.60945]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/1.60945], [5.59773283]Kh5h, Kd5d, Ks5s, Kc5c[/5.59773283], [5.74924]AhJh, AdJd, AsJs, AcJc[/5.74924], [6.77196323]Kh6h, Kd6d, Ks6s, Kc6c[/6.77196323], [7.97523]Ah7h, Ad7d, As7s, Ac7c[/7.97523], [12.0498]Ah5h, Ad5d, As5s, Ac5c[/12.0498], [13.860800000000001]KhQh, KdQd, KsQs, KcQc[/13.860800000000001], [15.3453]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/15.3453], [25.604]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/25.604], [32.5858]KhTh, KdTd, KsTs, KcTc[/32.5858], [38.4031]Ah4h, Ad4d, As4s, Ac4c[/38.4031], [39.940799999999996]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/39.940799999999996], [45.8523]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/45.8523], [48.2912]KhJh, KdJd, KsJs, KcJc[/48.2912], [55.318599999999996]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/55.318599999999996], [76.8888]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/76.8888], [99.8891]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.8891], [99.9974]AhKh, AdKd, AsKs, AcKc[/99.9974]",
        '100bb': "[32.9863]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/32.9863], [53.650200000000005]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/53.650200000000005], [74.3854]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/74.3854]"
      },
      call: {
        '15bb': "[0.65310261]7h6h, 7d6d, 7s6s, 7c6c[/0.65310261], [0.883726]Ah5h, Ad5d, As5s, Ac5c[/0.883726], [1.78187]KhTh, KdTd, KsTs, KcTc[/1.78187], [2.27913381]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/2.27913381], [2.83527]Th9h, Td9d, Ts9s, Tc9c[/2.83527], [3.4019800000000004]JhTh, JdTd, JsTs, JcTc[/3.4019800000000004], [5.13886893]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/5.13886893], [5.19794]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/5.19794], [8.54806]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/8.54806], [11.6951]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/11.6951], [11.952300000000001]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/11.952300000000001], [12.790299999999998]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/12.790299999999998], [14.404760089999998]5h4h, 5d4d, 5s4s, 5c4c[/14.404760089999998], [14.529255760000002]6h5h, 6d5d, 6s5s, 6c5c[/14.529255760000002], [19.9468]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/19.9468], [22.534599999999998]KhJh, KdJd, KsJs, KcJc[/22.534599999999998], [23.1112]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/23.1112], [31.0045]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/31.0045], [33.7219]AhJh, AdJd, AsJs, AcJc[/33.7219], [39.6605]KhQh, KdQd, KsQs, KcQc[/39.6605], AhQh, AdQd, AsQs, AcQc"
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
