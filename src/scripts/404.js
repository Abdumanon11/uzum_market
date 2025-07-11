    const colors=['#ff6b9d','#feca57','#48dbfb','#ff9ff3','#54a0ff'];
    for(let i=0;i<60;i++){
      const c=document.createElement('div');
      c.className='confetti';
      c.style.left=Math.random()*100+'vw';
      c.style.background=colors[Math.floor(Math.random()*colors.length)];
      c.style.width=c.style.height=Math.random()*10+6+'px';
      c.style.animationDuration=Math.random()*3+2+'s';
      document.body.appendChild(c);
    }