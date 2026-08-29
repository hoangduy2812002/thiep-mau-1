async function getVercel (){
    const response = await fetch("/api/vercel-usage");
    console.log(response);
    
  }
  
  getVercel();