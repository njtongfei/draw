<%@ Page Language="C#" %>
<%@ Import Namespace="SchoolPay" %>
<!DOCTYPE html>

<script runat="server">
    public static string wxJsApiParam { get; set; } 
    protected override void OnLoad(EventArgs e)
    {
        string openid = Request.QueryString["openid"];
        string total_fee = Request.QueryString["total_fee"];

        JsApiPay jsApiPay = new JsApiPay(this);
        jsApiPay.openid = openid;
        jsApiPay.total_fee = int.Parse(total_fee)*100;

        WxPayData unifiedOrderResult = jsApiPay.GetUnifiedOrderResult();
        wxJsApiParam = jsApiPay.GetJsApiParameters();//获取H5调起JS API参数                    
    }
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="../../../../js/jquery-1.7.2.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    </form>
    <script type="text/javascript">

        $.extend({
            getParam: function (url) {
                var p = {};
                if (url.split("?").length == 2) {
                    p = url.split("?")[1];
                }
                else {
                    p = url;
                }
                var ary = p.split("&");
                var str = "{";
                for (var i = 0; i < ary.length; i++) {
                    if (i == ary.length - 1) {
                        str += "\"" + ary[i].split("=")[0] + "\":\"" + ary[i].split("=")[1] + "\"";
                    }
                    else {
                        str += "\"" + ary[i].split("=")[0] + "\":\"" + ary[i].split("=")[1] + "\"" + ",";
                    }
                }
                str += "}";
                return $.parseJSON(str);
            }
        });
        //调用微信JS api 支付
        function jsApiCall()
        {
            WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            <%=wxJsApiParam%>,//josn串
                    function (res)
                    {
                        WeixinJSBridge.log(res.err_msg);
			            //支付成功
 			            if(res.err_msg == "get_brand_wcpay_request:ok"){
				            //alert(res.err_code + res.err_desc + res.err_msg);
                        	            var openId=$.getParam(window.location.search)["openid"];
                        	            var money=$.getParam(window.location.search)["total_fee"];
                        	            var uid=$.getParam(window.location.search)["uid"];
                        	            var sname=$.getParam(window.location.search)["sname"];
                                    
                        	            //支付完成 跳转到对应页面
                        	            /*
                        	            获取对应的参数
                        	            插入数据库 
                        	            
                        	            then 
                        	            运行下一行代码 跳转回原来的页面
                        	            */
                        	            
                        	            $.ajax({
                                            type: "POST",//
                                            //url: "Default.aspx/Add",
                                            //url: "http://test.51jyfw.com/BootStrap/WX/WXInterface001.ashx",
                                            //url: "http://test.51jyfw.com/BootStrap/WX/WXInterface001.ashx?Uid=10B21CD2-5F61-4843-9251-D9F044784C6A&Money=1&SName=一年级上",
                                            url: "http://test.51jyfw.com/BootStrap/WX/WXInterface001.ashx?Uid="+uid+"&Money="+money+"&SName="+sname,
                                            //data: "{Uid:'" + num1 + "',Money:'" + num2 + "',SName:'一年级下'}",
                                            //data: "{'Uid':'"+uid+"','Money':'"+money+"','SName':'"+sname+"'}",
                                            //contentType: "application/json",
                                            dataType: "jsonp",
                                            jsonp: "callbackparam",
                                            jsonpCallback:"success_jsonpCallback",
                                            success: function (data) {
                                            
                                                },
                                                error: function (msg) {
                                                        //alert(msg.status);
                                                    }
                                    });
                        	        window.location.href="/client/index.html#/buy-service?id="+openId+"&state=1";
			            }
                        else if(res.err_msg == "get_brand_wcpay_request:cancel"){	//支付取消
            			    //window.location.href="/client/index.html#/buy-service?id="+openId+"&state=1";
			            }
			            else if(res.err_msg == "get_brand_wcpay_request:fail"){		//支付失败
            			    //window.location.href="/client/index.html#/buy-service?id="+openId+"&state=1";
			            }
                    }
                    );
               }
 
               function callpay()
               {
                   if (typeof WeixinJSBridge == "undefined")
                   {
                       if (document.addEventListener)
                       {
                           document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                       }
                       else if (document.attachEvent)
                       {
                           document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                           document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                       }
                   }
                   else
                   {
                       jsApiCall();
                   }
               }
               window.onload=function(){
                   callpay();
               }
     </script>
</body>
</html>
