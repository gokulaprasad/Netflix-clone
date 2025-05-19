export default function Footer ({className = ""}){

  const links = [
    ["FAQ", "Investor Relations", "Buy Gift Cards", "Cookie Preferences", "Legal Notices"],
    ["Help Center", "Jobs", "Ways to Watch", "Corporate Information", "Only on Netflix"],
    ["Account", "Netflix Shop", "Terms of Use", "Contact Us", "Do Not Sell or Share Personal Information"],
    ["Media Center", "Redeem Gift Cards", "Privacy", "Speed Test", "Ad Choices"],
  ];

  
  return(
    <>
    <footer className= "bg-black text-gray-400 px-6 md:px-16 py-20 text-sm border-t-6 border-gray-800">
    <div className="max-w-6xl mx-auto">
      <div className="mb-6" >
        <a href="" className="underline">Questions? Call 1-844-505-2993</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {links.map((column,index)=>(
          <div key={index} className="space-y-2">
            {column.map((item,i)=> (
              <a key={i} href="#" className="block underline cursor-pointer">{item}</a>
            ))}
          </div>
        ))
        }
      </div>
    </div>
    </footer>
    </>
  )
}