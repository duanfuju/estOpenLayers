/*
 * 	    author：		 段福举
 *  createdate：		2016-12-09
 * description：		尝试实现JavaScript对象封装
 * 
*/
var nodeList;
//创建对象
function Lolita(){}

//设置对象的属性以及方法
Lolita.prototype={
	init:function(){
		//初始化方法
		this.render();
	},
	render:function(){
		
		//this.initLeftDataTree();//右侧树
		//this.tree();
	},

	tree:function(){
		var setting = {
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"随意勾选 1", open:true},
			{ id:11, pId:1, name:"随意勾选 1-1", open:true},
			{ id:111, pId:11, name:"随意勾选 1-1-1"},
			{ id:112, pId:11, name:"随意勾选 1-1-2"},
			{ id:12, pId:1, name:"随意勾选 1-2", open:true},
			{ id:121, pId:12, name:"随意勾选 1-2-1"},
			{ id:122, pId:12, name:"随意勾选 1-2-2"},
			{ id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
			{ id:21, pId:2, name:"随意勾选 2-1"},
			{ id:22, pId:2, name:"随意勾选 2-2", open:true},
			{ id:221, pId:22, name:"随意勾选 2-2-1", checked:true},
			{ id:222, pId:22, name:"随意勾选 2-2-2"},
			{ id:23, pId:2, name:"随意勾选 2-3"}
		];
		
		var code;
		
		function setCheck() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			py = $("#py").attr("checked")? "p":"",
			sy = $("#sy").attr("checked")? "s":"",
			pn = $("#pn").attr("checked")? "p":"",
			sn = $("#sn").attr("checked")? "s":"",
			type = { "Y":py + sy, "N":pn + sn};
			zTree.setting.check.chkboxType = type;
			showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
		}
		function showCode(str) {
			if (!code) code = $("#code");
			code.empty();
			code.append("<li>"+str+"</li>");
		}
		
		$(document).ready(function(){
			$.fn.zTree.init($("#leftTree"), setting, zNodes);
			setCheck();
			$("#py").bind("change", setCheck);
			$("#sy").bind("change", setCheck);
			$("#pn").bind("change", setCheck);
			$("#sn").bind("change", setCheck);
		});
	},
	
	initLeftDataTree:function(){
		var curMenu = null, zTree_Menu = null;
    	var setting = {
    		    data:{
    		        simpleData:{
    		            enable: true,
    		            idKey: "id",
    		            pIdKey: "pId",
    		            rootPId: 0
    		        }
    		    },
	          view: {
				 showLine: false,
				 showIcon: false,
				 fontCss: getFontCss,
				 addDiyDom: addDiyDom
	          },
 			 data: {
				 simpleData: {
				 	enable: true
				 }
			 },
			 callback: {
				beforeClick: beforeClick,
				onClick: zTreeOnClick
			 }
    		};
    	//给搜索的项增加颜色
		function getFontCss(treeId, treeNode) {  
	        return (!!treeNode.highlight) ? {"color":"red", "font-weight":"bold"} : {"color":"cornflowerblue", "font-weight":"normal"};  
	    }
		//树节点的点击事件
    	function zTreeOnClick(event, treeId, treeNode,clickFlag){
    		setRightDivText(treeNode);
    	}
    	//树节点的点击事件（查看节点的详情）
    	function setRightDivText(treeNode){
			$(".main iframe").attr("src",treeNode.detail);
    	}
    	function addDiyDom(treeId, treeNode) {
			var spaceWidth = 5;
			var switchObj = $("#" + treeNode.tId + "_switch"),
			icoObj = $("#" + treeNode.tId + "_ico");
			switchObj.remove();
			icoObj.before(switchObj);

			if (treeNode.level > 1) {
				var spaceStr = "<span style='display: inline-;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
				switchObj.before(spaceStr);
			}
		}
		function beforeClick(treeId, treeNode) {
			//过滤根节点（不包括火焰风暴）
			if(treeNode.name=="FireStorm"){
				return true;
			}
			if (treeNode.level == 0 ) {
				var zTree = $.fn.zTree.getZTreeObj("leftTree");
				zTree.expandNode(treeNode, true, false);
				return false;
			}
			
			return true;
		}
		//获取json数据
		$.ajaxSettings.async = false;//ajax数据改成同步的
		var treeData=[
			{ id:1, pId:0, name:"随意勾选 1", open:true},
			{ id:11, pId:1, name:"随意勾选 1-1", open:true},
			{ id:111, pId:11, name:"随意勾选 1-1-1"},
			{ id:112, pId:11, name:"随意勾选 1-1-2"},
			{ id:12, pId:1, name:"随意勾选 1-2", open:true},
			{ id:121, pId:12, name:"随意勾选 1-2-1"},
			{ id:122, pId:12, name:"随意勾选 1-2-2"},
			{ id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
			{ id:21, pId:2, name:"随意勾选 2-1"},
			{ id:22, pId:2, name:"随意勾选 2-2", open:true},
			{ id:221, pId:22, name:"随意勾选 2-2-1", checked:true},
			{ id:222, pId:22, name:"随意勾选 2-2-2"},
			{ id:23, pId:2, name:"随意勾选 2-3"}
		];
		$.ajaxSettings.async = true;//ajax数据改成异步的
		
		//将组合的数据添加到树形结构中
		var treeObj =$("#leftTree");
		$.fn.zTree.init(treeObj, setting, treeData);
		treeObj.hover(function () {
			if (!treeObj.hasClass("showIcon")) {
				treeObj.addClass("showIcon");
			}
		}, function() {
			treeObj.removeClass("showIcon");
		});
		
		
		
		//查询树形结构
		$("#searchNodes").keydown(function(event) {    
            if (event.keyCode == 13) {    
              getTreeByName("leftTree","searchNodes");
            }    
        });    
        
		//列表选项卡的树
		function getTreeByName(treeId,textId) {
		    var zTree = $.fn.zTree.getZTreeObj(treeId);
		    var value = $.trim($("#"+textId).val());
		    if(value.length>0){
		        if(nodeList){
		            updateNodes(false,false,treeId);
		        }
		        nodeList = zTree.getNodesByParamFuzzy("name", value);
		        updateNodes(true,true,treeId);
		    }
		}
		//更新高亮显示
		function updateNodes(highlight,expand,treeId) {
		    var zTree = $.fn.zTree.getZTreeObj(treeId);
		    $.each(nodeList,function(index,node){
		        node.highlight = highlight;
		        zTree.updateNode(node);
		        zTree.expandNode(node.getParentNode(),expand);
		    });
		}
	},
};





$(function(){
	var lolita = new Lolita();
	lolita.init();
});