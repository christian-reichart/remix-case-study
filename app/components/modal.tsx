interface ModalProps {
  readonly onClose: () => void;
  readonly onSubmit: () => void;
}
export default function Modal(props: ModalProps) {
  return (
    <div id="defaultModal" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center bg-black/[.7]">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
                <div className="flex justify-between items-start p-4 rounded-t border-b">
                    <h3 className="text-xl font-semibold text-gray-900e">
                        Create encrypted Message?
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal" onClick={props.onClose}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                    </button>
                </div>
                <div className="p-6 flex justify-center items-center">
                    <button className="rounded bg-red-500 py-2 px-4 m-2 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"  onClick={props.onClose}>Cancel</button>
                    <button className="rounded bg-blue-500 py-2 px-4 m-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300" onClick={props.onSubmit}>Create</button>
                </div>
            </div>
        </div>
    </div>
  )
}