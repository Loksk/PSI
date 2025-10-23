import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Exam } from '../types';

interface ExamRegistrationModalProps {
  exam: Exam | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (examId: string) => void;
}

export function ExamRegistrationModal({
  exam,
  isOpen,
  onClose,
  onRegister,
}: ExamRegistrationModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  if (!exam) return null;

  const availableSpots = exam.capacity - exam.registered;
  const registrationDeadline = new Date(exam.date);
  registrationDeadline.setDate(registrationDeadline.getDate() - 7);

  const handleRegister = async () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      setRegistrationSuccess(true);
      onRegister(exam.id);
      
      // Close after showing success message
      setTimeout(() => {
        setRegistrationSuccess(false);
        setAgreed(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  const handleClose = () => {
    if (!isRegistering) {
      setAgreed(false);
      setRegistrationSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        {!registrationSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Register for Exam</DialogTitle>
              <DialogDescription>
                Review the exam details and confirm your registration
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    {exam.subjectCode.substring(0, 2)}
                  </div>
                  <div className="flex-1">
                    <h3>{exam.subjectCode} - {exam.subjectName}</h3>
                    <p className="text-sm text-gray-600 mt-1">Final Examination</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p>{new Date(exam.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p>{exam.time} ({exam.duration} minutes)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p>Room {exam.room}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Capacity</p>
                      <p>{exam.registered}/{exam.capacity} registered</p>
                      {availableSpots > 0 && (
                        <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                          {availableSpots} spots available
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="text-sm">
                    Registration deadline: <strong>{registrationDeadline.toLocaleDateString()}</strong>
                  </p>
                  <p className="text-sm mt-2">
                    You must register at least 7 days before the exam date. Late registrations will not be accepted.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <h4 className="text-sm mb-2">Exam Requirements</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Valid student ID required</li>
                  <li>• Arrive 15 minutes before start time</li>
                  <li>• No electronic devices allowed</li>
                  <li>• Bring your own writing materials</li>
                </ul>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  disabled={isRegistering}
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-relaxed cursor-pointer select-none"
                >
                  I confirm that I have read and understood the exam requirements and regulations.
                  I agree to follow all examination rules and guidelines.
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isRegistering}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRegister}
                disabled={!agreed || isRegistering || availableSpots === 0}
              >
                {isRegistering ? 'Registering...' : 'Confirm Registration'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2">Registration Successful!</h3>
            <p className="text-gray-600">
              You have been successfully registered for this exam.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              A confirmation email has been sent to your university email address.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
