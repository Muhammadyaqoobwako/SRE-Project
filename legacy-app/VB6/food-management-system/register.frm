VERSION 5.00
Object = "{67397AA1-7FB1-11D0-B148-00A0C922E820}#6.0#0"; "MSADODC.OCX"
Begin VB.Form Form2 
   BorderStyle     =   1  'Fixed Single
   Caption         =   "Order Entry & Billing"
   ClientHeight    =   11085
   ClientLeft      =   45
   ClientTop       =   390
   ClientWidth     =   19125
   LinkTopic       =   "Form2"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   11085
   ScaleWidth      =   19125
   StartUpPosition =   3  'Windows Default
   WindowState     =   2  'Maximized
   Begin VB.CommandButton cmdout 
      Caption         =   "clear"
      Height          =   375
      Left            =   15120
      TabIndex        =   34
      Top             =   7680
      Width           =   1095
   End
   Begin VB.CommandButton cmddelete 
      Caption         =   "delete"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   14.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   615
      Left            =   15360
      TabIndex        =   32
      Top             =   6480
      Width           =   1215
   End
   Begin VB.CommandButton cmdsave 
      Caption         =   "save"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   14.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   615
      Left            =   15240
      TabIndex        =   31
      Top             =   4920
      Width           =   1335
   End
   Begin VB.CommandButton cmdadd 
      Caption         =   "add"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   14.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   615
      Left            =   15240
      TabIndex        =   30
      Top             =   3240
      Width           =   1215
   End
   Begin VB.CommandButton cmdlast 
      Caption         =   "last"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   14.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   495
      Left            =   11640
      TabIndex        =   29
      Top             =   8040
      Width           =   1695
   End
   Begin VB.CommandButton cmdfirst 
      Caption         =   "first"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   14.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   495
      Left            =   9480
      TabIndex        =   28
      Top             =   8040
      Width           =   1455
   End
   Begin VB.CommandButton cmdprevious 
      Caption         =   "previous"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   14.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   495
      Left            =   7080
      TabIndex        =   27
      Top             =   8040
      Width           =   1455
   End
   Begin MSAdodcLib.Adodc Adodc1 
      Height          =   495
      Left            =   2160
      Top             =   8040
      Width           =   2175
      _ExtentX        =   3836
      _ExtentY        =   873
      ConnectMode     =   0
      CursorLocation  =   3
      IsolationLevel  =   -1
      ConnectionTimeout=   15
      CommandTimeout  =   30
      CursorType      =   3
      LockType        =   3
      CommandType     =   1
      CursorOptions   =   0
      CacheSize       =   50
      MaxRecords      =   0
      BOFAction       =   0
      EOFAction       =   0
      ConnectStringType=   1
      Appearance      =   1
      BackColor       =   -2147483643
      ForeColor       =   -2147483640
      Orientation     =   0
      Enabled         =   -1
      Connect         =   "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\Users\ONIBUKUN\Desktop\vb class\bat\bat.mdb;Persist Security Info=False"
      OLEDBString     =   "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\Users\ONIBUKUN\Desktop\vb class\bat\bat.mdb;Persist Security Info=False"
      OLEDBFile       =   ""
      DataSourceName  =   ""
      OtherAttributes =   ""
      UserName        =   ""
      Password        =   ""
      RecordSource    =   "select * from customer"
      Caption         =   "navigation"
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      _Version        =   393216
   End
   Begin VB.CommandButton cmdnext 
      Caption         =   "next"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   14.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   495
      Left            =   4800
      TabIndex        =   22
      Top             =   8040
      Width           =   1455
   End
   Begin VB.Frame Frame1 
      Height          =   6735
      Left            =   1200
      TabIndex        =   0
      Top             =   1080
      Width           =   13455
      Begin VB.CheckBox Check4 
         Caption         =   "Extra Cheese"
         DataField       =   "internet"
         DataSource      =   "Adodc1"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   255
         Left            =   11880
         TabIndex        =   26
         Top             =   5880
         Width           =   1500
      End
      Begin VB.CheckBox Check3 
         Caption         =   "Spicy Level"
         DataField       =   "transport"
         DataSource      =   "Adodc1"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   255
         Left            =   10320
         TabIndex        =   25
         Top             =   5880
         Width           =   1455
      End
      Begin VB.CheckBox Check2 
         Caption         =   "Dessert Add-on"
         DataField       =   "kitchen"
         DataSource      =   "Adodc1"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   255
         Left            =   9000
         TabIndex        =   24
         Top             =   5880
         Width           =   1600
      End
      Begin VB.CheckBox Check1 
         Caption         =   "Extra Drinks"
         DataField       =   "laundary"
         DataSource      =   "Adodc1"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   255
         Left            =   7560
         TabIndex        =   23
         Top             =   5880
         Width           =   1455
      End
      Begin VB.ComboBox durationtxt 
         DataField       =   "days"
         DataSource      =   "Adodc1"
         Height          =   315
         Left            =   2880
         TabIndex        =   21
         Top             =   3600
         Width           =   1935
      End
      Begin VB.TextBox addresstxt 
         DataField       =   "adress"
         DataSource      =   "Adodc1"
         Height          =   735
         Left            =   2880
         TabIndex        =   18
         Top             =   5400
         Width           =   3615
      End
      Begin VB.ComboBox capacity 
         DataField       =   "capacity"
         DataSource      =   "Adodc1"
         Height          =   315
         ItemData        =   "register.frx":0000
         Left            =   2880
         List            =   "register.frx":000D
         TabIndex        =   16
         Top             =   4440
         Width           =   1695
      End
      Begin VB.ComboBox agetxt 
         DataField       =   "age"
         DataSource      =   "Adodc1"
         Height          =   315
         ItemData        =   "register.frx":001A
         Left            =   9360
         List            =   "register.frx":0045
         TabIndex        =   15
         Top             =   2400
         Width           =   1095
      End
      Begin VB.TextBox amounttxt 
         DataField       =   "amount"
         DataSource      =   "Adodc1"
         Height          =   495
         Left            =   9240
         TabIndex        =   13
         Top             =   3480
         Width           =   3015
      End
      Begin VB.TextBox occuptxt 
         DataField       =   "occupation"
         DataSource      =   "Adodc1"
         Height          =   615
         Left            =   2880
         TabIndex        =   11
         Top             =   2400
         Width           =   3495
      End
      Begin VB.TextBox contacttxt 
         DataField       =   "contact"
         DataSource      =   "Adodc1"
         Height          =   495
         Left            =   9240
         TabIndex        =   10
         Top             =   1440
         Width           =   3495
      End
      Begin VB.TextBox emailtxt 
         DataField       =   "email"
         DataSource      =   "Adodc1"
         Height          =   615
         Left            =   2880
         TabIndex        =   9
         Top             =   1320
         Width           =   3375
      End
      Begin VB.TextBox othernametxt 
         DataField       =   "other_names"
         DataSource      =   "Adodc1"
         Height          =   495
         Left            =   9240
         TabIndex        =   8
         Top             =   480
         Width           =   3615
      End
      Begin VB.TextBox head_namereg 
         DataField       =   "name"
         DataSource      =   "Adodc1"
         Height          =   495
         Left            =   2880
         TabIndex        =   7
         Top             =   480
         Width           =   3375
      End
      Begin VB.Label Label12 
         Caption         =   "Add-ons / Extras"
         BeginProperty Font 
            Name            =   "MS Serif"
            Size            =   30
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   735
         Left            =   7440
         TabIndex        =   20
         Top             =   4680
         Width           =   5655
      End
      Begin VB.Label Label11 
         Caption         =   "Special Instructions"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   735
         Left            =   840
         TabIndex        =   19
         Top             =   5280
         Width           =   2200
      End
      Begin VB.Label Label9 
         Caption         =   "Order Status"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   960
         TabIndex        =   17
         Top             =   4440
         Width           =   1455
      End
      Begin VB.Line Line1 
         X1              =   7080
         X2              =   7080
         Y1              =   120
         Y2              =   6720
      End
      Begin VB.Label Label8 
         Caption         =   "Total Price"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   7680
         TabIndex        =   14
         Top             =   3480
         Width           =   1335
      End
      Begin VB.Label Label7 
         Caption         =   "Order Type"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   960
         TabIndex        =   12
         Top             =   3480
         Width           =   1695
      End
      Begin VB.Label Label6 
         Caption         =   "Quantity"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   7920
         TabIndex        =   6
         Top             =   2520
         Width           =   1000
      End
      Begin VB.Label Label5 
         Caption         =   "Food Item"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   960
         TabIndex        =   5
         Top             =   2520
         Width           =   1455
      End
      Begin VB.Label Label4 
         Caption         =   "Phone Number"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   7800
         TabIndex        =   4
         Top             =   1440
         Width           =   1455
      End
      Begin VB.Label Label3 
         Caption         =   "Customer Email"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   1080
         TabIndex        =   3
         Top             =   1560
         Width           =   1600
      End
      Begin VB.Label Label2 
         Caption         =   "Table Number"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   7920
         TabIndex        =   2
         Top             =   480
         Width           =   1455
      End
      Begin VB.Label Label1 
         Caption         =   "Customer Name"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   735
         Left            =   1080
         TabIndex        =   1
         Top             =   480
         Width           =   1655
      End
   End
   Begin VB.Label Label13 
      Alignment       =   2  'Center
      BackColor       =   &H8000000D&
      Caption         =   "Label13"
      DataField       =   "id"
      DataSource      =   "Adodc1"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   21.75
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   -1  'True
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00FFFFFF&
      Height          =   735
      Left            =   3720
      TabIndex        =   33
      Top             =   120
      Width           =   9375
   End
End
Attribute VB_Name = "Form2"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub cmdadd_Click()
    If cmdadd.Caption = "add" Then
        Adodc1.Recordset.AddNew
        head_namereg.SetFocus
        disablebuttons
        cmdsave.Enabled = True
        cmdadd.Caption = "cancel"
    Else
        Adodc1.Recordset.CancelUpdate
        enablebuttons
        cmdsave.Enabled = False
        cmdadd.Caption = "add"
    End If
        
End Sub

Private Sub cmddelete_Click()
    With Adodc1.Recordset
        .Delete
        If .EOF Then
            .MovePrevious
            If .BOF Then
                MsgBox "this recordset is empty.", vbInformation, "no record"
                disablebuttons
            End If
        End If
    End If
    End With
End Sub

Private Sub cmdFirst_Click()
    'move to first record'
   
    Adodc1.Recordset.MoveFirst
    
End Sub

Private Sub cmdlast_Click()
    'move to last record'
    Adodc1.Recordset.MoveLast
End Sub

Private Sub cmdnext_Click()
 'move next record'
 With Adodc1.Recordset
    .MoveNext
    If .EOF Then
        .MoveFirst
    End If
End With
End Sub


Private Sub cmdout_Click()
head_namereg.Text = ""
emailtxt.Text = ""
othernametxt.Text = ""
addresstxt.Text = ""
contacttxt.Text = ""
occuptxt.Text = ""
End Sub

Private Sub cmdPrevious_Click()
    With Adodc1.Recordset
        .MovePrevious
        If .BOF Then
            .MoveLast
        End If
    End With
 
 End Sub

Private Sub cmdsave_Click()
    Adodc1.Recordset.Update
    enablebuttons
    cmdsave.Enabled = False
    cmdadd.Caption = "add"
End Sub

Private Sub disablebuttons()
    cmdnext.Enabled = False
    cmdprevious.Enabled = False
    cmdfirst.Enabled = False
    cmdlast.Enabled = False
    cmddelete.Enabled = False
    
End Sub

Private Sub enablebuttons()
    cmdnext.Enabled = True
    cmdprevious.Enabled = True
    cmdfirst.Enabled = True
    cmdlast.Enabled = True
    cmddelete.Enabled = True
    
End Sub


Private Sub Combo3_Change()

End Sub


Private Sub Form_Load()
    ' Set up dynamic connection string
    Adodc1.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & App.Path & "\bat.mdb;Persist Security Info=False"
    Adodc1.RecordSource = "select * from customer"
    Adodc1.Refresh
    
    ' Populate Order Status dropdown (capacity control)
    capacity.Clear
    capacity.AddItem "Pending"
    capacity.AddItem "Preparing"
    capacity.AddItem "Served"
    capacity.AddItem "Paid"
    capacity.AddItem "Cancelled"
    
    ' Populate Order Type dropdown (durationtxt control)
    durationtxt.Clear
    durationtxt.AddItem "Dine-in"
    durationtxt.AddItem "Takeaway"
    durationtxt.AddItem "Delivery"
    
    ' Populate Quantity dropdown (agetxt control)
    agetxt.Clear
    Dim i As Integer
    For i = 1 To 10
        agetxt.AddItem CStr(i)
    Next i
End Sub
