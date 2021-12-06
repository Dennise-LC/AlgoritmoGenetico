from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'Home.html')
    
def Resp(request):
    Texto = 0
    Poblacion = 0
    Mutacion = 0
    if request.method == 'GET':
        Texto = request.GET.get('Texto')
        Poblacion = int(request.GET.get('Poblacion'))
        Mutacion = float(request.GET.get('Mutacion'))
        print(Texto,Poblacion,Mutacion)

    return render(request,'Resp.html',{'T':Texto,'P':Poblacion,'M':Mutacion})