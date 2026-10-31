import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Upload,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Trash2,
  Sparkles,
  Camera,
  BadgeAlert
} from 'lucide-react';
import { BookingDetails } from '../types';

interface UpdateIdProofModalProps {
  booking: BookingDetails;
  isOpen: boolean;
  onClose: () => void;
  onSaveIdProof: (updatedBooking: BookingDetails) => void;
}

export const UpdateIdProofModal: React.FC<UpdateIdProofModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSaveIdProof,
}) => {
  if (!isOpen) return null;

  const [idType, setIdType] = useState<'Aadhaar Card' | 'Passport' | "Driver's License" | 'Voter ID'>(
    booking.idProofType || 'Aadhaar Card'
  );
  const [idNumber, setIdNumber] = useState<string>(
    booking.idProofNumber || ''
  );
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(
    booking.idProofPhotoUrl
  );
  const [fileName, setFileName] = useState<string>(
    booking.idProofFileName || 'govt_id_proof.jpg'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.includes('pdf')) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WebP) or document.');
      return;
    }
    setErrorMessage(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPhotoUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!idNumber.trim()) {
      setErrorMessage('Please enter your Government ID document number.');
      return;
    }
    if (!photoUrl) {
      setErrorMessage('Booking Approval Blocked: You must attach a clear photo copy of your ID to get this booking approved.');
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);
    const updated: BookingDetails = {
        ...booking,
        idProofType: idType,
        idProofNumber: idNumber.trim(),
        idProofPhotoUrl: photoUrl,
        idProofFileName: fileName,
      idVerificationStatus: 'Pending Verification',
    };
    onSaveIdProof(updated);
    setIsSaving(false);
    onClose();
  };

  const handleRemoveId = () => {
    setPhotoUrl(undefined);
    setFileName('');
    setIdNumber('');
    const updated: BookingDetails = {
      ...booking,
      idProofType: undefined,
      idProofNumber: undefined,
      idProofPhotoUrl: undefined,
      idProofFileName: undefined,
      idVerificationStatus: 'Action Required: ID Proof Missing',
      status: booking.status === 'Confirmed' ? 'Pending Review' : booking.status,
    };
    onSaveIdProof(updated);
  };

  const isCurrentlyApproved = false; // Only a trusted review process may mark an ID as verified.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-[#FFF5F5] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-red-900/20 my-8 animate-scaleUp text-[#450A0A] ring-1 ring-red-950/5">
        
        {/* Modal Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-black font-brand leading-tight">
                Update Government ID Proof
              </h3>
              <p className="text-xs text-red-100 font-medium">
                Mandatory for Booking Approval & Resort Check-in
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-red-100 hover:text-white rounded-full hover:bg-red-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Strict Government Approval Rule Banner */}
          <div className="bg-red-100/80 border-2 border-red-300 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-red-950 uppercase tracking-wide font-brand">
              <BadgeAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>Mandatory Booking Approval Policy</span>
            </div>
            <p className="text-xs text-red-900 leading-relaxed font-medium">
              As per Government tourism and hotel security regulations, <strong>if you do not update your ID proof, your booking will not be approved</strong>. All guests must provide a valid Government Photo ID prior to arrival.
            </p>
          </div>

          {/* Booking Info Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-red-900/10 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-red-900/60 uppercase block">Booking Reference</span>
              <span className="text-xs font-mono font-bold text-red-950">{booking.bookingRef}</span>
              <p className="text-xs font-bold text-red-950 font-brand mt-0.5 truncate max-w-[200px] sm:max-w-xs">
                {booking.title}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-red-900/60 uppercase block">Approval Status</span>
              {isCurrentlyApproved ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-red-600" />
                  <span>Submitted for Review</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-900 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full animate-pulse">
                  <AlertTriangle className="w-3 h-3 text-red-600" />
                  <span>Pending Review</span>
                </span>
              )}
            </div>
          </div>

          {/* ID Type & Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-red-900/80 uppercase block mb-1">
                ID Document Type *
              </label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value as any)}
                className="w-full bg-white border border-red-900/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-red-950 focus:outline-none focus:border-red-600 shadow-2xs"
              >
                <option value="Aadhaar Card">Aadhaar Card (UIDAI)</option>
                <option value="Passport">Passport (Indian / International)</option>
                <option value="Driver's License">Driver's License (Govt. RTO)</option>
                <option value="Voter ID">Voter ID Card (ECI)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-red-900/80 uppercase block mb-1">
                Document Number *
              </label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder={
                  idType === 'Aadhaar Card'
                    ? 'XXXX-XXXX-4821 (12 digits)'
                    : idType === 'Passport'
                    ? 'Z8920194 (8 characters)'
                    : 'DL-0420110012345'
                }
                className="w-full bg-white border border-red-900/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-red-950 focus:outline-none focus:border-red-600 font-mono shadow-2xs"
              />
            </div>
          </div>

          {/* Photo Copy Upload / Document Preview */}
          <div>
            <label className="text-[11px] font-bold text-red-900/80 uppercase block mb-1.5">
              Upload Front / Back Photo Copy of ID *
            </label>

            {photoUrl ? (
              <div className="bg-white rounded-2xl border-2 border-red-600/50 p-3.5 shadow-xs flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-red-900/20 shrink-0 bg-stone-900 shadow-inner group">
                  <img
                    src={photoUrl}
                    alt="ID Proof Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 bg-red-950/90 text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                    ✓ Photo Attached
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-black text-red-950 font-brand">
                    <FileCheck className="w-4 h-4 text-red-600" />
                    <span>{idType} Attached</span>
                  </div>
                  <p className="text-[11px] text-red-900/70 truncate mt-0.5">
                    {fileName || 'govt_id_document.jpg'}
                  </p>
                  <p className="text-[10px] text-red-800 font-semibold mt-1">
                    ✓ Ready to be submitted for official booking approval
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <label className="text-[11px] font-bold text-red-950 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1 rounded-xl cursor-pointer transition-colors">
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                        }}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveId}
                      className="text-[11px] font-bold text-red-700 hover:text-red-900 flex items-center gap-1 px-2 py-1 cursor-pointer"
                      title="Remove ID document details"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
                }}
                className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                  isDragging
                    ? 'border-red-600 bg-red-50 scale-[1.01]'
                    : 'border-red-900/30 hover:border-red-600 bg-white/70'
                }`}
              >
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-2xs">
                  <Upload className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="text-xs font-black text-red-950 font-brand">
                  Drag & drop or Browse your ID document
                </h4>
                <p className="text-[11px] text-red-900/70 mt-0.5">
                  Clear photo copy of Aadhaar, Passport, or Driving License (JPG, PNG, PDF)
                </p>

                <div className="flex items-center justify-center gap-2 mt-3.5">
                  <label className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-xs transition-colors">
                    <span>Browse Image File</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-900 text-xs font-bold rounded-2xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-red-900/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-red-900/80 hover:text-red-950 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer font-brand hover:scale-102"
          >
            {isSaving ? (
              <span>Verifying & Approving...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Save ID & Approve Booking</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
