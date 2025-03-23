
import React, { useState } from 'react';
import { Camera, MapPin, Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface ReportFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting?: boolean;
}

interface FormData {
  title: string;
  description: string;
  location: string;
  image: File | null;
}

const ReportForm = ({ onSubmit, isSubmitting = false }: ReportFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    location: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.location || !formData.image) {
      toast({
        title: "Missing information",
        description: "Please fill all fields and add an image",
        variant: "destructive"
      });
      return;
    }
    onSubmit(formData);
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Getting your location",
        description: "Please wait while we fetch your current location."
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo purposes, just show coordinates
          // In a real app, you would use reverse geocoding to get an address
          const locationString = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setFormData(prev => ({ ...prev, location: locationString }));
          
          toast({
            title: "Location detected",
            description: "Your current location has been added to the form."
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: error.message,
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base">
          Issue Title
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="E.g., Large pothole on Main Street"
          value={formData.title}
          onChange={handleChange}
          className="input-focus h-11"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Please provide details about the issue..."
          value={formData.description}
          onChange={handleChange}
          className="input-focus min-h-[120px]"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location" className="text-base">
          Location
        </Label>
        <div className="flex space-x-2">
          <Input
            id="location"
            name="location"
            placeholder="Enter location or use current location"
            value={formData.location}
            onChange={handleChange}
            className="input-focus h-11 flex-1"
            required
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleGetLocation}
            className="flex items-center gap-2"
          >
            <MapPin size={16} />
            <span className="hidden sm:inline">Current Location</span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-base">
          Photo Evidence
        </Label>
        
        {!imagePreview ? (
          <div 
            className={cn(
              "border-2 border-dashed rounded-lg p-6 transition-colors",
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-muted-foreground/50",
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Camera size={24} />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-base font-medium">Upload Photo</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop an image, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Max file size: 5MB
                </p>
              </div>
              
              <label className="relative">
                <Button variant="secondary" size="sm" type="button" className="pointer-events-none">
                  <Upload size={16} className="mr-2" />
                  Select Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden border border-border">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-64 object-cover"
            />
            <Button 
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={removeImage}
            >
              <X size={16} />
            </Button>
            <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white p-2 text-xs">
              {formData.image?.name}
            </div>
          </div>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 text-base button-hover" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" />
            Submitting Report...
          </>
        ) : (
          <>
            <CheckCircle size={18} className="mr-2" />
            Submit Report
          </>
        )}
      </Button>
    </form>
  );
};

export default ReportForm;
