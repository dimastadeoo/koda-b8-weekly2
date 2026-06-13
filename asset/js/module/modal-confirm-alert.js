define(function (require) {
    const $ = require('jquery');
    const modalId = 'global-app-modal';

    function createModalElement() {
        if ($('#' + modalId).length) {
            return;
        }

        const modalHtml = `
            <div 
                id="${modalId}" 
                class="hidden fixed inset-0 z-[9999] items-center justify-center px-4"
            >
                <div class="absolute inset-0 bg-black/50" data-modal-backdrop></div>

                <div 
                    class="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="${modalId}-title"
                    aria-describedby="${modalId}-message"
                >
                    <h3 
                        id="${modalId}-title" 
                        class="text-lg font-semibold text-gray-800 mb-2"
                    >
                        Informasi
                    </h3>

                    <p 
                        id="${modalId}-message" 
                        class="text-sm text-gray-600 mb-6"
                    >
                        Pesan modal
                    </p>

                    <div class="flex justify-center gap-3">
                        <button 
                            type="button" 
                            id="${modalId}-cancel"
                            class="hidden px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors"
                        >
                            Batal
                        </button>

                        <button 
                            type="button" 
                            id="${modalId}-ok"
                            class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        `;

        $('body').append(modalHtml);
    }

    function closeModal() {
        const modal = $('#' + modalId);

        modal.addClass('hidden').removeClass('flex');
        $('body').removeClass('overflow-hidden');

        $(document).off('keydown.globalModal');
    }

    function showModal(options) {
        createModalElement();

        const config = {
            title: 'Informasi',
            message: '',
            okText: 'OK',
            cancelText: 'Batal',
            showCancel: false,
            closeOnBackdrop: false,
            closeOnEsc: true,
            ...options
        };

        return new Promise(function (resolve) {
            const modal = $('#' + modalId);
            const titleEl = $('#' + modalId + '-title');
            const messageEl = $('#' + modalId + '-message');
            const okBtn = $('#' + modalId + '-ok');
            const cancelBtn = $('#' + modalId + '-cancel');
            const backdrop = modal.find('[data-modal-backdrop]');

            titleEl.text(config.title);
            messageEl.text(config.message);
            okBtn.text(config.okText);
            cancelBtn.text(config.cancelText);

            if (config.showCancel) {
                cancelBtn.removeClass('hidden');
            } else {
                cancelBtn.addClass('hidden');
            }

            modal.removeClass('hidden').addClass('flex');
            $('body').addClass('overflow-hidden');

            okBtn.trigger('focus');

            okBtn.off('click.globalModal').on('click.globalModal', function () {
                closeModal();
                resolve(true);
            });

            cancelBtn.off('click.globalModal').on('click.globalModal', function () {
                closeModal();
                resolve(false);
            });

            backdrop.off('click.globalModal').on('click.globalModal', function () {
                if (config.closeOnBackdrop) {
                    closeModal();
                    resolve(false);
                }
            });

            $(document).off('keydown.globalModal').on('keydown.globalModal', function (e) {
                if (e.key === 'Escape' && config.closeOnEsc) {
                    closeModal();
                    resolve(false);
                }
            });
        });
    }

    function alertModal(options) {
        return showModal({
            title: options.title || 'Informasi',
            message: options.message || '',
            okText: options.okText || 'OK',
            showCancel: false,
            closeOnBackdrop: options.closeOnBackdrop || false,
            closeOnEsc: options.closeOnEsc !== false
        });
    }

    function confirmModal(options) {
        return showModal({
            title: options.title || 'Konfirmasi',
            message: options.message || '',
            okText: options.okText || 'Ya',
            cancelText: options.cancelText || 'Batal',
            showCancel: true,
            closeOnBackdrop: options.closeOnBackdrop || false,
            closeOnEsc: options.closeOnEsc !== false
        });
    }


    return {
        alert: alertModal,
        confirm: confirmModal,
        close: closeModal
    };
});