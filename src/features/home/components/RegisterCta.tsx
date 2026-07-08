type RegisterCtaProps = {
  onRegister: () => void;
};

export function RegisterCta({ onRegister }: RegisterCtaProps) {
  return (
    <section className="">
      <div className="mx-auto max-w-280 border-y border-[#f4f1ea]/15 px-3 py-10 text-center sm:px-4 lg:px-6">
        <p className="text-[11px] font-bold tracking-[2.6px] text-[#df454d] uppercase">
          Ready to dance
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl leading-tight font-black uppercase sm:text-5xl">
          Sẵn sàng cháy hết mình cùng Nhảy Cái Giải?
        </h2>
        <button
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-sm border-0 border-b-3 border-[#c92c35] bg-[#f4f1ea] px-8 text-sm font-extrabold tracking-wide text-[#111110] uppercase transition hover:-translate-y-0.5 hover:bg-white"
          onClick={onRegister}
          type="button"
        >
          Đăng ký ngay
        </button>
      </div>
    </section>
  );
}
