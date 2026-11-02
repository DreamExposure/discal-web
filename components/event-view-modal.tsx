import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/24/solid";


export function ModalHeader() {
}

export function ModalContent() {

}

export function ModalFooter(props: { setOpen: (state: boolean) => {}}) {


    // TODO: Fix classes, notably color, template from tailwind
    return <div className="mt-5 sm:mt-6">
        <button
            type="button"
            onClick={() => props.setOpen(false)}
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
            Dismiss
        </button>
    </div>
}

export default function EventViewModal(props: {open: boolean, setOpen: (state: boolean) => {}}) {

    return <Dialog open={props.open} onClose={props.setOpen} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
        />

        {/*TODO: Clean this up, break it apart and obv include event data rather than the template example */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                >
                    <div>
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/10">
                            <CheckIcon aria-hidden="true" className="size-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                                Lorum ipsum
                            </DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                                </p>
                            </div>
                        </div>
                    </div>
                    <ModalFooter setOpen={props.setOpen}/>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
}