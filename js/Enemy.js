

/**
 * 敌机对象
 * 
 * 
 */

		function Enemy(type){
			//设置一个随机id
			this.id = parseInt(Math.random()*100000)+"";
			
			//ele属性
			this.ele = document.createElement("div");
			this.hp = 1;//血量
			this.speed = 0;//速度
			this.dieImgs = [];//敌机销毁时的图片
			
			//初始化方法
			this.init = function(){
				document.body.appendChild(this.ele);
				
				//把敌机添加到游戏引擎的敌机属性里
				gameEngine.enemyList[this.id] = this;
				
				
				switch(type){
					
					//小型敌机
					case this.PLANE_TYPE_SMALL:
					this.ele.className = "enemy-small";
					this.hp  = this.PLANE_HP_SMALL;
					this.speed = this.PLANE_SPEED_SMALL;
					
					//飞机销毁时的动画图片
					this.dieImgs = ["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png"];
					break;
					//中型敌机
					case this.PLANE_TYPE_MIDDLE:
					this.ele.className = "enemy-middle";
					this.hp = this.PLANE_HP_MIDDLE;
					this.speed = this.PLANE_SPEED_MIDDLE;
					
					//飞机销毁时的图片
					this.dieImgs = ["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png"];
					break;
					
					//大型敌机
					case this.PLANE_TYPE_LARGE:
					this.ele.className = "enemy-large";
					this.hp = this.PLANE_HP_LARGE;
					this.speed = this.PLANE_SPEED_LARGE;
					
					//飞机销毁时的图片
					this.dieImgs = ["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png"];
					
					break;
					
				}
				
				//生成一个随机位置
				var left = gameEngine.ele.offsetLeft + Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth);
				this.ele.style.left = left + "px";
				this.ele.style.top = -this.ele.offsetHeight + "px";
				
				
				return this;
			}
			
		//======敌机移动
		this.move = function(){
			
			var self = this;
			this.timer = setInterval(function(){
				
				//判断是否超出边界
				if(self.ele.offsetTop>document.documentElement.clientHeight){
					//清除定时器
					clearInterval(self.timer);
					//移除敌机
					self.destroy();
					
				}
				
				
				//移动代码
				self.ele.style.top = self.ele.offsetTop + self.speed + "px";
				
			},50);
			
		}
		
		
		//敌机销毁的方法
		this.destroy = function(){
			document.body.removeChild(this.ele);
		};
		
		
		//敌机被击中，受伤的方法
		this.hurt = function(){
			this.hp--;//血量-1
			//血量为0的时候就可以爆炸了
			if(this.hp==0){
				//血量没了，可以爆炸了
				this.boom();
			}
			
		};
		
		//敌机爆炸
		this.boom = function(){
			//清除定时器，停止运动
			clearInterval(this.timer);
			
			//爆炸动画
			var index = 0;
			var self = this;
			var dieTimer = setInterval(function(){
				if(index>=self.dieImgs.length){
					clearInterval(dieTimer);//停止爆炸动画
					self.destroy();
					
					//删除gameEngine中的enemyList中的敌机
				    delete	gameEngine.enemyList[self.id];
				}else{
					//切换图片
					self.ele.style.background = "url("+self.dieImgs[index]+")";
					index++;
				}
				
			},50);
			
		}
		
		}

		Enemy.prototype = {
			//敌机类型
			PLANE_TYPE_SMALL:1,
			PLANE_TYPE_MIDDLE:2,
			PLANE_TYPE_LARGE:3,
			
			//敌机的血量
			PLANE_HP_SMALL:1,
			PLANE_HP_MIDDLE:3,
			PLANE_HP_LARGE:8,
			
			//敌机速度
			PLANE_SPEED_SMALL:8,
			PLANE_SPEED_MIDDLE:5,
			PLANE_SPEED_LARGE:3,
			
		};
