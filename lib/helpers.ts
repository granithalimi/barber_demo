/* eslint-disable @typescript-eslint/no-unused-vars */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("sq-Al", { weekday: "long" });
  const month = date.toLocaleDateString("sq-Al", { month: "long" });
  const dayNum = date.getDate();
  return `${dayNum} ${month}, ${day}`;
};

export const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
};

export const html = (name: string, date: string, time: string) => {
  return `
<body style="margin:0;padding:0;background:#f5f5f5;color:#111;">
    <!-- Wrapper -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f5f5;">
      <tr>
        <td align="center" style="padding:28px 16px;">
          <!-- Card -->
          <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="padding:28px 24px 16px 24px;background:#111;">
                <div style="font-family: Helvetica, Arial, sans-serif; font-size:14px; letter-spacing:2px; color:#9ae6b4; text-transform:uppercase;">
                  Appointment Confirmed
                </div>
                <div style="font-family: Georgia, 'Times New Roman', serif; font-size:26px; line-height:1.2; color:#ffffff; margin-top:8px;">
                  You’re booked in, looking sharp already ✂️
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 24px 0 24px;">
                <p style="margin:0 0 12px 0; font-family: Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6; color:#222;">
                  Hey <strong>${name}</strong>,
                </p>
                <p style="margin:0 0 16px 0; font-family: Georgia, 'Times New Roman', serif; font-size:16px; line-height:1.6; color:#333;">
                  Your appointment at <span style="font-weight:bold;color:#000;">Snap Barbershop</span> has been <span style="color:#22c55e;font-weight:bold;">accepted</span>.  
                  We can’t wait to give you a fresh cut that’ll have you walking out feeling brand new.
                </p>
              </td>
            </tr>

            <!-- Appointment Details -->
            <tr>
              <td style="padding:16px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f9fafb;border:1px solid #e5e5e5;border-radius:8px;">
                  <tr>
                    <td style="padding:16px;font-family: Helvetica, Arial, sans-serif; font-size:14px; color:#111;">
                      <p style="margin:0 0 6px 0;"><strong>📅 Date:</strong> ${formatDate(date)}</p>
                      <p style="margin:0 0 6px 0;"><strong>⏰ Time:</strong> ${time}</p>
                      <p style="margin:0;"><strong>📍 Location:</strong> Snap Barbershop, 123 Fade St, Your City</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="center" style="padding:24px 24px 16px 24px;">
                <a href="https://your-map-link.example"
                   style="display:inline-block; text-decoration:none; font-family: Helvetica, Arial, sans-serif; font-weight:600; font-size:15px; padding:14px 22px; border-radius:999px; background:#111; color:#fff;">
                  View Location
                </a>
              </td>
            </tr>

            <!-- Notes -->
            <tr>
              <td style="padding:0 24px 24px 24px;">
                <p style="margin:0; font-family: Helvetica, Arial, sans-serif; font-size:13px; line-height:1.5; color:#555;">
                  Please arrive 5–10 minutes early. If you need to reschedule, reply to this email or call us at <strong>+389 00 000 000</strong>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:18px 16px 28px 16px;background:#f0f0f0;">
                <div style="font-family: Helvetica, Arial, sans-serif; font-size:11px; line-height:1.6; color:#666;">
                  Snap Barbershop · 123 Fade St, Your City  
                  <br />
                  <a href="#" style="color:#22c55e; text-decoration:none;">Cancel appointment</a>
                </div>
              </td>
            </tr>
          </table>
          <!-- /Card -->
        </td>
      </tr>
    </table>
  </body>
  `;
};
