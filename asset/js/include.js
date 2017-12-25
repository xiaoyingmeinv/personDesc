/**
 * Created by OJH on 2017/12/20.
 */
//约定上下文环境
var baseContext = "/personDesc";

function writeScript(url){
    var scriptTmp = "<" + "script type='text/javascript' src='" + url + "'></"+"script>";
    document.writeln(scriptTmp);
}

function writeLink(url, optionRel){
    var cssTmp = "<" + "link rel='stylesheet' type='text/css' href='" + url + "'></"+"link>";
    if(optionRel != null){
        cssTmp = "<" + "link rel='"+optionRel+"'  href='" + url + "'></"+"link>";
    }
    
    document.writeln(cssTmp);
}

writeLink(baseContext + "/favicon.ico", "shortcut icon");

writeScript(baseContext + "/asset/js/jquery.min.js");
writeScript(baseContext + "/asset/js/extension.js");
writeScript(baseContext + "/asset/js/template-web.js");
writeScript(baseContext + "/asset/js/util.js");

//引入bootstrap
writeScript(baseContext + "/asset/bootstrap/bootstrap.js");
writeLink(baseContext + "/asset/bootstrap/bootstrap.css");
writeLink(baseContext + "/asset/css/common.css");


//图片查看插件
writeScript(baseContext + "/asset/fancyBox/lib/jquery.mousewheel.pack.js?v=3.1.3");
writeScript(baseContext + "/asset/fancyBox/source/jquery.fancybox.pack.js?v=2.1.5");
writeLink(baseContext + "/asset/fancyBox/source/jquery.fancybox.css?v=2.1.5");

//writeScript(baseContext + "/asset/fancyBox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5");
//writeScript(baseContext + "/asset/fancyBox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7");
//writeLink(baseContext + "/asset/fancyBox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7");

writeScript(baseContext + "/asset/fancyBox/source/helpers/jquery.fancybox-media.js?v=1.0.6");

