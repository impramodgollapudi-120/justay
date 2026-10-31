import { useState } from 'react';
import packagePaymentService from '../../services/packages/packagePaymentService';

export const usePackagePayment = () => {
  const [processing, setProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [error, setError] = useState(null);

  const makePayment = async ({ amount, method, bookingId, travelerCount }) => {
    setProcessing(true);
    setError(null);
    try {
      const res = await packagePaymentService.process({ amount, method, bookingId, travelerCount });
      setPaymentResult(res);
      return res;
    } catch (err) {
      setError(err.message || 'Payment processing failed');
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  return {
    processing,
    paymentResult,
    error,
    makePayment,
  };
};

export default usePackagePayment;
