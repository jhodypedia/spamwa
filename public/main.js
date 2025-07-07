$(document).ready(function () {
  $('#otpForm').on('submit', async function (e) {
    e.preventDefault();
    const phone = $('#phone').val().trim();
    const delay = parseInt($('#delay').val().trim());
    const consoleBox = $('#console');

    if (!phone || !delay) return toastr.error('Isi semua field.');

    consoleBox.html('');
    toastr.info(`Memulai kirim OTP ke ${phone}`);

    for (let i = 0; i < 5; i++) {
      consoleBox.append(`<div>[${i + 1}] Mengirim...</div>`);
      try {
        const res = await fetch(`/api/send-otp/${phone}`);
        const data = await res.json();
        consoleBox.append(`<div>${data.message}</div>`);
        toastr[data.success ? 'success' : 'warning'](data.message);
      } catch (err) {
        consoleBox.append(`<div>❌ Gagal mengirim.</div>`);
        toastr.error('Gagal request ke server.');
      }
      await new Promise(r => setTimeout(r, delay * 1000));
    }

    toastr.info('Selesai.');
  });
});
