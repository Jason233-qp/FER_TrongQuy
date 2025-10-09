import React from "react";

export default function Navbar() {
  return (
    <div className="navbar-content">
      {/* MENU SECTION */}
      <section className="menu-section">
        <h2 className="text-start mb-4">Our Menu</h2>
        <div className="row justify-content-center">
          <PizzaCard
            name="Margherita Pizza"
            img="/assets/margherita-pizza.png"
            price="$24.00"
            oldPrice="$40.00"
            tag="sale"
          />
          <PizzaCard
            name="Mushroom Pizza"
            img="/assets/mushroom-pizza.png"
            price="$25.00"
          />
          <PizzaCard
            name="Hawaiian Pizza"
            img="/assets/hawaiian-pizza.png"
            price="$30.00"
            tag="new"
          />
          <PizzaCard
            name="Pesto Pizza"
            img="/assets/pesto-pizza.png"
            price="$30.00"
            oldPrice="$50.00"
            tag="sale"
          />
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="booking text-center">
        <h2>Book Your Table</h2>
        <form className="mt-3">
          <div className="row justify-content-center mb-3">
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Your Name *" />
            </div>
            <div className="col-md-3">
              <input type="email" className="form-control" placeholder="Your Email *" />
            </div>
            <div className="col-md-3">
              <select className="form-control">
                <option>Select a Service</option>
                <option>Dine In</option>
                <option>Take Away</option>
              </select>
            </div>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="col-md-9">
              <textarea className="form-control" rows="4" placeholder="Please write your comment"></textarea>
            </div>
          </div>
          <button className="btn btn-warning px-4">Send Message</button>
        </form>
      </section>
    </div>
  );
}

function PizzaCard({ name, img, price, oldPrice, tag }) {
  return (
    <div className="col-md-2 card-custom">
      {tag && <div className={`tag ${tag}`}>{tag.toUpperCase()}</div>}
      <img src={img} alt={name} className="img-fluid" />
      <h5>{name}</h5>
      <p>
        {oldPrice && <span className="old-price me-2">{oldPrice}</span>}
        <span className="new-price">{price}</span>
      </p>
      <button className="btn btn-dark w-100">Buy</button>
    </div>
  );
}