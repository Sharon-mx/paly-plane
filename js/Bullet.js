


	/**
	 * 子弹对象
	 */
	
	function Bullet(){
		//给子弹设置一个id
		this.id = parseInt(Math.random()*100000)+"";
		
		//ele
		this.ele = document.createElement("div");
		
		//初始化方法
		this.init = function(){
			document.body.appendChild(this.ele);
			
			//---将子弹添加到游戏引擎bulletList中
			gameEngine.bulletList[this.id] = this;
			
			//==设置子弹样式
			this.ele.className = "bullet";
			
			//位置
			var left = myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/2-this.ele.offsetWidth/2;
			
			this.ele.style.left = left+"px";
			
			this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
			
			return this;
		};
		
		//子弹移动的方法
		this.move = function(){
			
			var self = this;
			this.timer = setInterval(function(){
				
				//超出边界则消失
				if(self.ele.offsetTop < -18){
					clearInterval(self.timer);
					//销毁子弹
					document.body.removeChild(self.ele);
				}
				
				self.ele.style.top = self.ele.offsetTop - 10 + "px";
			},50);
			
		}
		
		
		//添加爆炸方法
		this.boom = function(){
			//清除定时器，停止移动
			clearInterval(this.timer);
			
			this.ele.className = "bullet-die";//
			
			//子弹爆炸动画
			var dieImgs = ["images/die1.png","images/die2.png"];
			var index = 0;
			var self = this;
			var dieTimer = setInterval(function(){
				
				//动画执行完毕
				if(index==dieImgs.length){
					clearInterval(dieTimer);
					//销毁子弹！
					self.destroy();
				}else{
				//切换背景图片
				self.ele.style.background = "url("+dieImgs[index]+")";
				index++;
				}
				
				
			},50);
			
		}
		
		//子弹销毁方法
		this.destroy = function(){
			document.body.removeChild(this.ele);
		}
		
	}







