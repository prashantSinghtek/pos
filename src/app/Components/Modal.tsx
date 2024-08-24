import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Modal = ({ isOpen, onClose, children ,type }: any) => {
  let path = usePathname()
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ translateX: 100, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: 100, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`transition-all fixed ${
            isOpen
              ? "bottom-0 opacity-100 z-50"
              : "-bottom-[20px] opacity-0 -z-10"
          }  left-0 bg-black backdrop-blur-[0px] bg-opacity-70 h-screen w-full overflow-x-hidden flex items-center justify-center scrollbar-hide p-20 `}
        >
          <motion.div
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 100, opacity: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
            className={` bg-white p-5  modal-container rounded-2xl shadow-lg z-50 overflow-y-auto  h-5/6 ${path == "/addexpenses" ? "w-fit":type == "BankTransfer" ? "w-2/5":"lg:w-10/12 "} `}
         
          >
            <button
              title="close"
              className="modal-close-btn float-right focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              <svg
                className="fill-current h-6 w-6"  
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 11-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 010-1.414 1 1 0 011.414 0l2.93 2.93 2.93-2.93a1 1 0 011.414 0 1 1 0 010 1.414l-2.93 2.93 2.93 2.93a1 1 0 010 1.414z" />
              </svg>
            </button>
            <div className="mt-5">{children}</div>
          </motion.div>
          <div
            className="w-full h-full opacity-30 absolute top-0 left-0 z-40 bg-popup bg-cover bg-bottom"
            onClick={onClose}
          ></div>
        </motion.div>
      )}
    </>
  );
};
export default Modal;
