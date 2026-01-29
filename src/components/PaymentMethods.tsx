"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, Shield, CheckCircle } from "lucide-react";
import Image from "next/image";

const PaymentMethods = () => {
  const paymentMethods = [
    {
      id: 1,
      name: "Mercado Pago",
      logo: "https://static.wikia.nocookie.net/logopedia/images/7/79/Logotipo_de_Mercado_Pago_alternativo.svg/revision/latest/scale-to-width-down/250?cb=20250802020358&path-prefix=es",
      description: "Billetera digital segura y rápida",
      color: "from-blue-500 to-cyan-400",
      borderColor: "border-blue-500",
      glowColor: "shadow-blue-500/50",
      bgLogo: "bg-white",
      logoFilter: "",
      features: ["Aceptamos Visa", "Aceptamos Mastercard", "Protección de comprador"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const paymentLogos = [
    {
      name: "Visa",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
      bgColor: "from-blue-600/20 to-blue-400/20",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/60",
      shadowColor: "hover:shadow-blue-500/20",
      filter: "filter brightness-0 invert",
    },
    {
      name: "Mastercard",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
      bgColor: "bg-white",
      borderColor: "border-red-500/30",
      hoverBorder: "hover:border-red-500/60",
      shadowColor: "hover:shadow-red-500/20",
      filter: "",
    },
    {
      name: "Mercado Pago",
      src: "https://static.wikia.nocookie.net/logopedia/images/7/79/Logotipo_de_Mercado_Pago_alternativo.svg/revision/latest/scale-to-width-down/250?cb=20250802020358&path-prefix=es",
      bgColor: "bg-white",
      borderColor: "border-red-500/30",
      hoverBorder: "hover:border-red-500/60",
      shadowColor: "hover:shadow-red-500/20",
      filter: "",
    },
    {
      name: "Efecty",
      src: "https://armmonias.com/wp-content/uploads/2025/01/Efecty-min.png",
      bgColor: "bg-white",
      borderColor: "border-orange-500/30",
      hoverBorder: "hover:border-orange-500/60",
      shadowColor: "hover:shadow-orange-500/20",
      filter: "",
    },
    {
      name: "Bancolombia",
      src: "https://vectorseek.com/wp-content/uploads/2023/09/Bancolombia-Icon-Logo-Vector.svg-.png",
      bgColor: "bg-white",
      borderColor: "border-red-600/30",
      hoverBorder: "hover:border-red-600/60",
      shadowColor: "hover:shadow-red-600/20",
      filter: "",
    },
    {
      name: "PSE",
      src: "https://www.cootransmede.com/wp-content/uploads/2022/02/logo-pse-300x300-1.png",
      bgColor: "bg-white",
      borderColor: "border-green-500/30",
      hoverBorder: "hover:border-green-500/60",
      shadowColor: "hover:shadow-green-500/20",
      filter: "",
    },
  ];

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(239,68,68,0.2),rgba(239,68,68,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(239,68,68,0.15),rgba(239,68,68,0))]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-red-500" />
            <span className="text-sm font-semibold text-red-400 uppercase tracking-[0.15em]">
              Métodos de Pago
            </span>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-red-500" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-red-50 via-white to-red-100 bg-clip-text text-transparent leading-tight">
            Formas de Pago
            <br />
            <span className="text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text">
              Seguras y Confiables
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Todos nuestros métodos de pago están certificados con los más altos estándares de seguridad internacional. 
            Compra con total confianza y protección garantizada.
          </p>
        </motion.div>

        {/* Accepted payment logos section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-12 mb-24 px-6"
        >
          <div className="text-center w-full">
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-4">Aceptamos</p>
            
            {/* Desktop - Sin animación */}
            <div className="hidden lg:flex items-center justify-center gap-8">
              {paymentLogos.map((logo, index) => (
                <motion.div
                  key={`desktop-${index}`}
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${logo.bgColor} border ${logo.borderColor} flex items-center justify-center backdrop-blur-sm ${logo.hoverBorder} transition-all duration-300 shadow-lg ${logo.shadowColor}`}>
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={40}
                      height={40}
                      className={`object-contain ${logo.filter}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile/Tablet - Con animación */}
            <div className="lg:hidden relative w-full overflow-hidden">
              <motion.div
                className="flex items-center gap-8"
                animate={{
                  x: [0, -((paymentLogos.length * 96) / 2)],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              >
                {[...paymentLogos, ...paymentLogos].map((logo, index) => (
                  <motion.div
                    key={`mobile-${index}`}
                    whileHover={{ scale: 1.2, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex-shrink-0"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${logo.bgColor} border ${logo.borderColor} flex items-center justify-center backdrop-blur-sm ${logo.hoverBorder} transition-all duration-300 shadow-lg ${logo.shadowColor}`}>
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={40}
                        height={40}
                        className={`object-contain ${logo.filter}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Payment methods grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-20"
        >
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              variants={itemVariants}
              whileHover={{
                y: -25,
                transition: { duration: 0.4 },
              }}
              className="group relative w-full max-w-md"
            >
              {/* Premium glow background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-25 blur-3xl rounded-3xl transition-all duration-500 group-hover:blur-2xl`}
              />

              {/* Premium card with glass effect */}
              <div
                className={`relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-2xl border ${method.borderColor} border-opacity-40 rounded-3xl p-10 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-opacity-80 ${method.glowColor} hover:${method.glowColor}`}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Premium shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-3xl" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Logo section */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                    className={`w-24 h-24 rounded-2xl ${method.bgLogo} flex items-center justify-center mb-8 shadow-xl relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                      src={method.logo}
                      alt={method.name}
                      width={96}
                      height={96}
                      className={`object-contain ${method.logoFilter} w-16 h-16`}
                    />
                  </motion.div>

                  {/* Text content */}
                  <h3 className="text-3xl font-bold text-white mb-2">{method.name}</h3>
                  <p className="text-sm text-zinc-400 mb-6 font-medium">{method.description}</p>

                  {/* Features list */}
                  <div className="space-y-3 mb-8 flex-grow">
                    {method.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle size={16} className="text-blue-400 flex-shrink-0" />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Security badge */}
                  <div className="flex items-center gap-2 mb-8 px-3 py-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <Shield size={14} className="text-blue-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                      Certificado y verificado
                    </span>
                  </div>

                  {/* Premium CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0 20px 40px rgba(59, 130, 246, 0.4)` }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = 'https://link.mercadopago.com.co/jeanpierremartinez'}
                    className={`w-full py-4 rounded-xl bg-gradient-to-r ${method.color} text-white font-bold text-sm uppercase tracking-[0.1em] transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group/btn`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <CreditCard size={16} />
                      Usar {method.name}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300" />
                  </motion.button>
                </div>

                {/* Bottom gradient accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${method.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium security footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-amber-900/30 via-amber-950/20 to-yellow-900/30 border border-amber-500/30 rounded-2xl p-12 text-center backdrop-blur-xl relative overflow-hidden group"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="text-amber-400" size={32} />
              </motion.div>
              <h3 className="text-3xl font-bold text-white">Protegido y Certificado</h3>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="text-amber-400" size={32} />
              </motion.div>
            </div>
            <p className="text-zinc-300 text-lg mb-4">
              Todos nuestros métodos de pago cuentan con encriptación SSL 256-bit y certificación PCI DSS Level 1.
            </p>
            <p className="text-amber-300 font-semibold text-base">
              ✓ Transacciones 100% Protegidas ✓ Privacidad Garantizada ✓ Compra sin Riesgos
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentMethods;