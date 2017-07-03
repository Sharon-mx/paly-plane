


/**
 * 游戏引擎
 */

var gameEngine = {
	
	ele:null,
	
	//存储屏幕上所有的敌机
	enemyList:{},
	//存储屏幕上所有的子弹
	bulletList:{},
	
	//初始化方法
	init:function(){
		this.ele = document.getElementById("body_main");
		
		return this;
	},
	
	//开始游戏
	start:function(){
		//游戏加载界面
		this.loading(function(){
			//加载界面已经执行完毕！
//			console.log("加载界面已经执行完毕！");
			
			//显示我的飞机！
			myPlane.init().autoFire();
			
			//主控功能
			gameEngine.keyListening();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//开启碰撞检测
			gameEngine.crashListening();
			
			
		});
		
	},
	
	//加载游戏
	loading:function(callback){
		//显示logo
		logo.init().show();
		
		var loadingEle = document.createElement("div");
		loadingEle.className = "loading";
		document.body.appendChild(loadingEle);
		
		//定时器，实现图片切换
		var index = 0;
		var loadImgs = ["./images/loading1.png","./images/loading2.png","./images/loading3.png"];
		var timer = setInterval(function(){
			if(index==6){
				clearInterval(timer);
				logo.hide();
				document.body.removeChild(loadingEle);
				
				//回调，告诉调用者，加载界面运行完毕
				callback();
				return;
			}
			
			loadingEle.style.background = "url("+loadImgs[index%3]+") no-repeat";
			
			index++;
			
		},500);
		
	},
	
	
	//主控功能，监听左右光标
	keyListening:function(){
		var speed = 0;//速度
		
		document.onkeydown = function(evt){
			var oEvent = evt || event;
			
			//左
			if(oEvent.keyCode == 37){
				speed = -8;//表示会向左运动
			}
			//右
			if(oEvent.keyCode == 39){
				speed = 8;//表示会向右运动
			}
			
		}
		
		document.onkeyup = function(){
			speed = 0;//移动速度为0
		}
		
		//定时器来监听运动方向
		setInterval(function(){
			//移动我的飞机
			myPlane.ele.style.left = myPlane.ele.offsetLeft + speed + "px";
			
			//判断是否超出了左边界
			if(myPlane.ele.offsetLeft<=gameEngine.ele.offsetLeft){
				myPlane.ele.style.left = gameEngine.ele.offsetLeft + "px";
			}
			//判断是否超出了右边界
			if(myPlane.ele.offsetLeft>=(gameEngine.ele.offsetLeft+gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth)){
				myPlane.ele.style.left = gameEngine.ele.offsetLeft + gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth + "px";
			}
			
			
			
		},30);
		
	},
	
	//创建敌机
	createEnemy:function(){
		//大飞机
		setInterval(function(){
			//创建大飞机几率
			var flag = Math.random() > 0.8 ?true :false;
			if(flag){
				var enemy = new Enemy(Enemy.prototype.PLANE_TYPE_LARGE);
				enemy.init().move();
			}
			
		},2000);
		
		//中飞机
		setInterval(function(){
			var flag = Math.random() > 0.8 ?true :false;
			if(flag){
				var enemy = new Enemy(Enemy.prototype.PLANE_TYPE_MIDDLE);
				enemy.init().move();
			}
			
		},1000);
		//小飞机
			setInterval(function(){
			var flag = Math.random() > 0.5 ?true :false;
			if(flag){
				var enemy = new Enemy(Enemy.prototype.PLANE_TYPE_SMALL);
				enemy.init().move();
			}
			
		},500);
		
	},
	
	//碰撞检测
	crashListening:function(){
		/**
		 * 把所有屏幕上的的敌机存起来
		 * 把所有屏幕上的子弹存起来
		 * 利用定时器时刻遍历敌机和子弹是否有碰撞
		 */
		var timer = setInterval(function(){
			
			//遍历所有的敌机
			for(var i in gameEngine.enemyList){
				
				//遍历所有的子弹
				for(var j in gameEngine.bulletList){
					if(gameEngine.bulletList[j]==undefined){//剔除无效的子弹
						continue;
					}
					
					//判断子弹和敌机是否有碰撞
					if(isCrash(gameEngine.enemyList[i].ele,gameEngine.bulletList[j].ele)){
						//进入到这里，就是有碰撞
						
						//让子弹爆炸
						gameEngine.bulletList[j].boom();
						
						//让飞机受伤
						gameEngine.enemyList[i].hurt();
						
						//删除bulletList中的子弹
						delete gameEngine.bulletList[j];
										
					}
					
				}
			
			
				//敌机和我的飞机是否有碰撞
			if(isCrash(gameEngine.enemyList[i].ele,myPlane.ele)){
				if(confirm("GameOver,是否继续！")){
					clearInterval(timer);//清除检测碰撞的定时器
					
					//延迟2秒之后再开启
					setTimeout(function(){
						gameEngine.crashListening();//重新开启碰撞检测
						
					},2000);
				}
			}
			}
			
			
			
		},100);
		
		
	}
	
}


//logo
var logo = {
	ele:null,
	init:function(){
		this.ele = document.createElement("div");
		this.ele.className = "logo";
		return this;
	},
	//显示logo
	show:function(){
		document.body.appendChild(this.ele);
	},
	//隐藏logo
	hide:function(){
		document.body.removeChild(this.ele);
	}
}


