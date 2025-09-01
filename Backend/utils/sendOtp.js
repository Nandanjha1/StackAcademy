import twilio from "twilio";

export const sendOtp = async (phoneNumber, otp) => {
  try {
    // --- FIX: Initialize the client here, inside the function ---
    // This ensures that process.env has been loaded by the time this code runs.
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    // The phone number must be in E.164 format (e.g., +919876543210)
    const formattedPhoneNumber = `+91${phoneNumber}`; 

    await client.messages.create({
      body: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhoneNumber,
    });
    
    console.log(`✅ Real OTP sent to ${formattedPhoneNumber}`);
    return { success: true, message: "OTP sent successfully." };

  } catch (error) {
    // Log the full, detailed error object from Twilio.
    console.error("❌ Detailed Twilio Error:", error); 
    // Create a more informative error to send back to the frontend.
    throw new Error(`Failed to send OTP: ${error.message}`); 
  }
};
