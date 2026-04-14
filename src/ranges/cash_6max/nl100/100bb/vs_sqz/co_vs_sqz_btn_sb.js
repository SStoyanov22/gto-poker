// CO vs sqz BTN+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz BTN+SB",
  description: "CO faces squeeze — BTN called, SB squeezed — 6-max, 100bb",
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
        '30bb': "[1.50046]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/1.50046], [2.4016200000000003]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/2.4016200000000003], [7.5278]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/7.5278], [11.161999999999999]Ah5h, Ad5d, As5s, Ac5c[/11.161999999999999], [11.5148]AhJh, AdJd, AsJs, AcJc[/11.5148], [16.3631]Ah4h, Ad4d, As4s, Ac4c[/16.3631], [22.232]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/22.232], [24.7103]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/24.7103], [26.6324]Ah8h, Ad8d, As8s, Ac8c[/26.6324], [31.4398]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/31.4398], [37.2077]KhTh, KdTd, KsTs, KcTc[/37.2077], [44.5311]AhTh, AdTd, AsTs, AcTc[/44.5311], [58.457499999999996]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/58.457499999999996], [70.6254]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/70.6254], [72.7756]KhJh, KdJd, KsJs, KcJc[/72.7756], [78.5855]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/78.5855], [98.059]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/98.059], [99.913]AhKh, AdKd, AsKs, AcKc[/99.913]",
        '100bb': "[0.7589699999999999]Ah5h, Ad5d, As5s, Ac5c[/0.7589699999999999], [4.41538]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/4.41538], [41.537]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/41.537], [48.777100000000004]AhJh, AdJd, AsJs, AcJc[/48.777100000000004], [55.813199999999995]KhQh, KdQd, KsQs, KcQc[/55.813199999999995], [74.3006]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/74.3006], [75.28970000000001]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/75.28970000000001]"
      },
      call: {
        '15bb': "[1.8989200000000002]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/1.8989200000000002], [1.94096]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/1.94096], [3.4674499999999995]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/3.4674499999999995], [3.8617]JhTh, JdTd, JsTs, JcTc[/3.8617], [4.61872]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/4.61872], [6.94548981]6h5h, 6d5d, 6s5s, 6c5c[/6.94548981], [8.94985]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/8.94985], [16.27347706]5h4h, 5d4d, 5s4s, 5c4c[/16.27347706], [17.3928]KhTh, KdTd, KsTs, KcTc[/17.3928], [18.3]KhJh, KdJd, KsJs, KcJc[/18.3], [19.1253]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/19.1253], [21.4145]AdAh, AsAh, AcAh, AsAd, AcAd, AcAs[/21.4145], [26.617600000000003]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/26.617600000000003], [29.37]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/29.37], [39.7058]AhJh, AdJd, AsJs, AcJc[/39.7058], [44.1183]KhQh, KdQd, KsQs, KcQc[/44.1183], [99.9931]AhQh, AdQd, AsQs, AcQc[/99.9931]",  
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
