import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Zap, ShoppingCart } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  const editions = product.editions || [];

  const minPrice =
    editions.length > 0
      ? Math.min(...editions.map((e) => e.price))
      : product.price || 499;

  const maxPrice =
    editions.length > 0
      ? Math.max(...editions.map((e) => e.price))
      : product.maxPrice || 1899;

  const isWindows11 = product.id === "win11";

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();

    const selectedEdition = editions[0];

    const productToAdd = {
      ...product,
      id: selectedEdition?.id || product.id,
      name: selectedEdition?.name || product.versionName || "Standard",
      price: selectedEdition?.price || minPrice,
      type: selectedEdition?.type || "Lifetime License Key - Bind",
      selectedEdition:
        selectedEdition?.name || product.versionName || "Standard",
      image: selectedEdition?.image || product.image,
    };

    addToCart(productToAdd);

    toast.success("Successfully added to cart!", {
      style: {
        background: "#1e293b",
        color: "#fff",
        borderRadius: "12px",
        padding: "10px 14px",
        fontSize: "13px",
        fontWeight: "600",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
      },
      iconTheme: {
        primary: "#3b82f6",
        secondary: "#fff",
      },
      duration: 3000,
    });
  };

  let displayName =
    product.versionName || product.name || "Microsoft 365 Official";

  displayName = displayName
    .replace(/Windows 11\s*-\s*Windows 11/gi, "Windows 11")
    .replace(/Windows 10\s*-\s*Windows 10/gi, "Windows 10")
    .replace(/Windows 7\s*-\s*Windows 7/gi, "Windows 7")
    .replace(/MS Office\s*-\s*Microsoft Office/gi, "Microsoft Office");

  return (
    <div
      onClick={handleCardClick}
      className="
        group
        bg-slate-900/90
        hover:bg-slate-900
        border border-slate-800/80
        hover:border-blue-500/50
        rounded-xl sm:rounded-2xl
        overflow-hidden
        transition-all duration-300
        w-full
        flex flex-col justify-between
        cursor-pointer
        shadow-lg
        active:scale-[0.99]
        sm:active:scale-100
        relative
      "
    >
      <div>
        {/* ================================================= */}
        {/* IMAGE SECTION */}
        {/* ================================================= */}

        <div
          className="
            relative
            w-full
            h-32
            xs:h-36
            sm:h-48
            md:h-52
            lg:h-56
            bg-slate-950
            overflow-hidden
            border-b border-slate-800/80
          "
        >
          {/* =============================================== */}
          {/* WINDOWS 11 - THREE IMAGES */}
          {/* =============================================== */}

          {isWindows11 && editions.length > 0 ? (
            <div className="flex w-full h-full">
              {editions.slice(0, 3).map((edition) => (
                <div
                  key={edition.id}
                  className="
                    relative
                    flex-1
                    h-full
                    min-w-0
                    overflow-hidden
                    bg-slate-950
                  "
                >
                  <img
                    src={edition.image}
                    alt={edition.name}
                    className="
                      absolute inset-0
                      w-full
                      h-full
                      object-cover
                      object-center
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                  />

                  {/* Edition Name */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      bg-slate-950/75
                      backdrop-blur-sm
                      text-center
                      py-1
                      sm:py-1.5
                      z-10
                    "
                  >
                    <span
                      className="
                        text-[7px]
                        xs:text-[8px]
                        sm:text-[10px]
                        font-bold
                        text-white
                        leading-none
                      "
                    >
                      {edition.name
                        .replace("Windows 11 ", "")
                        .replace("Professional", "Pro")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : product.image ? (
            /* =============================================== */
            /* OTHER PRODUCTS */
            /* =============================================== */

            <img
              src={product.image}
              alt={displayName}
              className="
                block
                w-full
                h-full
                object-cover
                group-hover:scale-105
                transition-transform
                duration-500
              "
            />
          ) : (
            /* =============================================== */
            /* FALLBACK */
            /* =============================================== */

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-blue-950
                via-slate-900
                to-slate-950
                flex
                flex-col
                items-center
                justify-center
                p-2
              "
            >
              <span
                className="
                  text-[9px]
                  font-bold
                  text-blue-400
                  tracking-wider
                  uppercase
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  px-2
                  py-0.5
                  rounded-full
                  mb-1
                "
              >
                {product.category || "KeyShop BD"}
              </span>

              <div
                className="
                  w-7
                  h-7
                  rounded-lg
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-black
                  text-xs
                  shadow-inner
                "
              >
                K
              </div>
            </div>
          )}

          {/* =============================================== */}
          {/* OFFICIAL BADGE */}
          {/* =============================================== */}

          <div className="absolute top-2 left-2 z-20">
            <span
              className="
                text-[8px]
                sm:text-[9px]
                font-bold
                text-slate-200
                bg-slate-950/80
                backdrop-blur-md
                px-1.5
                py-0.5
                rounded-md
                shadow-sm
                border
                border-slate-800
                flex
                items-center
                gap-1
              "
            >
              <ShieldCheck className="w-2.5 h-2.5 text-blue-400" />
              <span>Official</span>
            </span>
          </div>

          {/* =============================================== */}
          {/* CART BUTTON */}
          {/* =============================================== */}

          <div
            className="
              absolute
              top-2
              right-2
              z-20
              opacity-0
              invisible
              group-hover:opacity-100
              group-hover:visible
              translate-y-1
              group-hover:translate-y-0
              transition-all
              duration-300
            "
          >
            <button
              onClick={handleCartClick}
              className="
                w-7 h-7
                sm:w-8 sm:h-8
                bg-slate-900/95
                hover:bg-blue-600
                text-slate-200
                hover:text-white
                rounded-full
                shadow-lg
                border border-slate-700
                flex
                items-center
                justify-center
                transition-all
                duration-200
                active:scale-90
              "
              title="Add to Cart"
            >
              <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>

        {/* ================================================= */}
        {/* TITLE + PRICE */}
        {/* ================================================= */}

        <div className="p-2.5 sm:p-5 text-center">
          <h3
            className="
              text-xs
              sm:text-base
              font-bold
              text-slate-100
              tracking-wide
              mb-1.5
              sm:mb-2
              line-clamp-1
              group-hover:text-blue-400
              transition-colors
            "
          >
            {displayName}
          </h3>

          <div
            className="
              text-emerald-400
              font-black
              text-xs
              sm:text-xl
              tracking-tight
              mb-1
              sm:mb-4
              font-mono
            "
          >
            ৳{minPrice.toLocaleString()}{" "}
            {editions.length > 1 ? `- ৳${maxPrice.toLocaleString()}` : ""}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* QUICK ORDER */}
      {/* ================================================= */}

      <div className="p-2 sm:p-5 sm:pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="
            w-full
            py-2
            sm:py-3
            px-3
            sm:px-4
            rounded-lg
            sm:rounded-xl
            font-bold
            flex
            items-center
            justify-center
            gap-1.5
            transition-all
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            hover:from-blue-500
            hover:to-indigo-500
            text-white
            text-[11px]
            sm:text-sm
            tracking-wide
            shadow-md
            shadow-blue-600/20
            cursor-pointer
            active:scale-95
            group/btn
          "
        >
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />

          <span>Quick Order</span>

          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
